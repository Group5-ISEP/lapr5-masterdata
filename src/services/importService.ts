import { Service, Inject } from 'typedi';
import config from "../../config";
import IImportService from './IServices/IImportService';
import { Result } from "../core/logic/Result";
import IVehicleTypeService from './IServices/IVehicleTypeService';
import ILineService from './IServices/ILineService';
import IPathService from './IServices/IPathService';
import INodeService from './IServices/INodeService';
import { Request } from 'express';
import { IncomingForm } from 'formidable';
import fs from 'fs';
import XmlStream from 'xml-stream';
import IVehicleTypeDTO from '../dto/IVehicleTypeDTO';
import INodeDTO from '../dto/INodeDTO';
import ILineDTO from '../dto/ILineDTO';
import IPathDTO from '../dto/IPathDTO';
import ISegmentDTO from '../dto/ISegmentDTO';
import { ImportCreations } from '../utils/ImportCreations';


@Service()
export default class ImportService implements IImportService {
    constructor(
        //Inject needed services
        @Inject(config.services.vehicleType.name) private vehicleTypeServiceInstance: IVehicleTypeService,
        @Inject(config.services.line.name) private lineServiceInstance: ILineService,
        @Inject(config.services.path.name) private pathServiceInstance: IPathService,
        @Inject(config.services.node.name) private nodeServiceInstance: INodeService
    ) { }

    
    public async importFile(req: Request): Promise < Result < string >> {
        try {
            ImportCreations.init();

            console.log("Importing data file");

            var form = new IncomingForm();

            await form.parse(req, (err, fields, files) => this.fileParser(err, fields, files));

            console.log(ImportCreations.get());
            return Result.ok(ImportCreations.get());
        } catch (e) {
            throw e;
        }
    }

    private async fileParser(err, fields, files) {
        try {
            if (err) {
                console.error(err);
                return err;
            }
            var file = files.file;
            var stream = fs.createReadStream(file.path);
            var xml = new XmlStream(stream);
            //We'll first retrieve the VehicleTypes from the XML file
            xml.preserve('VehicleType', true);
            xml.collect('subitem');
            xml.on('endElement: VehicleType', (item) => this.createVehicleType(item['$']));
            //Now we'll retrieve the Nodes
            xml.preserve('Node', true);
            xml.collect('subitem');
            xml.on('endElement: Node', (item) => this.createNode(item['$']));
            //Now the lines
            xml.preserve('Line', true);
            xml.collect('subitem');
            xml.on('endElement: Line', (item) => this.createLine(item));
            //Now the paths
            xml.preserve('Path', true);
            xml.collect('subitem');
            xml.on('endElement: Path', (item) => this.createPath(item));
        } catch (e) {
            throw e;
        }
    }

    private async createVehicleType(v: any): Promise<Result<IVehicleTypeDTO>> {
        try {
            var energySource: string;
            switch (v.EnergySource) {
                case 20: energySource = "GPL"; break
                case 23: energySource = "Gas"; break
                case 50: energySource = "Hidrogen"; break
                case 75: energySource = "Electric"; break
                case 1: energySource = "Gasoline"; break
                default: energySource = "Gasoline";
            }
            var vDTO: IVehicleTypeDTO = {
                id: v.key,
                name: v.Name,
                autonomy: v.Autonomy,
                costByKm: v.Cost,
                averageSpeed: v.AverageSpeed,
                emissions: v.Emissions,
                averageConsumption: v.Consumption,
                energySource: energySource
            }
            //console.log(vDTO);
            const vtDTOorError = await this.vehicleTypeServiceInstance.createVehicleType(vDTO);

            if (vtDTOorError.isFailure) {
                console.error(vtDTOorError.errorValue());
                return Result.fail<IVehicleTypeDTO>(vtDTOorError.errorValue());
            }

            ImportCreations.add("vehicleType");
            return Result.ok<IVehicleTypeDTO>(vtDTOorError.getValue());
        } catch (e) {
            throw e;
        }
    }

    private async createNode(n: any): Promise<Result<INodeDTO>> {
        try {
            //console.log(n);
            var IsDepot: boolean;
            var IsReliefPoint: boolean;
            if (n.IsDepot == 'True') IsDepot = true;
            else IsDepot = false;
            if (n.IsReliefPoint == 'True') IsReliefPoint = true;
            else IsReliefPoint = false;
            var nDTO: INodeDTO = {
                id: n.key,
                shortName: n.ShortName,
                name: n.Name,
                isDepot: IsDepot,
                isReliefPoint: IsReliefPoint,
                longitude: n.Longitude,
                latitude: n.Latitude
            }
            //console.log(nDTO);
            const nDTOorError = await this.nodeServiceInstance.createNode(nDTO);

            if (nDTOorError.isFailure) {
                var error = nDTOorError.errorValue()
                console.error(error);
                return Result.fail<INodeDTO>(error);
            }

            ImportCreations.add("node");
            return Result.ok<INodeDTO>(nDTOorError.getValue());
        } catch (e) {
            throw e;
        }
    }

    private async createLine(l: any): Promise<Result<ILineDTO>> {
        try {
            //console.log(l);
            var line = l['$'];
            //console.log(line);
            var tNodes = l['TerminalNodes']['$'];
            //console.log(l['TerminalNodes']['$']);
            
            var lDTO: ILineDTO = {
                id: null,
                code: line.key,
                name: line.Name,
                colorRGB: { red: line.ColorR, green: line.ColorG, blue: line.ColorB },
                terminalNodes: [tNodes.N1, tNodes.N2],
                allowedDriverTypes: [],
                allowedVehicleTypes: []
            }

            //console.log(lDTO);
            const lDTOorError = await this.lineServiceInstance.createLine(lDTO);

            if (lDTOorError.isFailure) {
                var error = lDTOorError.errorValue()
                console.error(error);
                return Result.fail<ILineDTO>(error);
            }

            ImportCreations.add("line");
            return Result.ok<ILineDTO>(lDTOorError.getValue());
        } catch (e) {
            throw e;
        }
    }

    private async constructSegments(sl: any): Promise<Result<ISegmentDTO[]>> {
        try {
            //console.log(sl);

            var segments = [];

            for (var i = 0; i < sl.length-1; i++) {
                segments.push({
                    startNode: sl[i].Node,
                    endNode: sl[i + 1].Node,
                    distance: sl[i + 1].Distance,
                    duration: sl[i + 1].Duration,
                    order: i + 1
                });
            }

            return Result.ok<ISegmentDTO[]>(segments);

        } catch (e) {
            throw e;
        }
    }

    private async createPath(p: any): Promise<Result<IPathDTO>> {
        try {
            var path = p['$'];

            var IsEmpty: boolean;
            if (path.IsEmpty == "False") IsEmpty = false;
            else IsEmpty = true;

            var direction: string;
            if (path.direction == "return") direction = "from";
            else direction = "to";

            var pathNodeList = [];
            var pathNodes = p['PathNodes'];

            for (var i = 1; i < 7 && pathNodes['PathNode' + i] != undefined; i++) {
                var actualpn = 'PathNode' + i;
                pathNodeList.push(pathNodes[actualpn]['$']);
            }

            var segmentList = await this.constructSegments(pathNodeList);
            if (segmentList.isFailure) return Result.fail<IPathDTO>(segmentList.errorValue());
            //console.log(segmentList.getValue());

            var segments = segmentList.getValue();

            var firstNode = segments[0].startNode;
            var lastNode = segments[segments.length-1].endNode;

            var pDTO: IPathDTO = {
                id: path.key,
                isEmpty: IsEmpty,
                lineCode: path.line,
                direction: direction,
                segmentList: segmentList.getValue(),
                firstNode: firstNode,
                lastNode: lastNode
            }

            //console.log(pDTO);
            const pDTOorError = await this.pathServiceInstance.createPath(pDTO);

            if (pDTOorError.isFailure) {
                var error = pDTOorError.errorValue()
                console.error(error);
                return Result.fail<IPathDTO>(error);
            }

            ImportCreations.add("path");
            return Result.ok<IPathDTO>(pDTOorError.getValue());
        } catch (e) {
            throw e;
        }
    }

}
