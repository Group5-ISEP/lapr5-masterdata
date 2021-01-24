
export class ImportCreations {
    private static vehicleTypes: number;
    private static nodes: number;
    private static lines: number;
    private static paths: number;

  public static init() {
      this.vehicleTypes = this.nodes = this.lines = this.paths = 0;
  }

  public static add(s: string) {
      switch (s) {
          case "vehicleType": this.vehicleTypes++;
          case "node": this.nodes++;
          case "line": this.lines++;
          case "path": this.paths++;
      }
  }

    public static get(): string {
        if (this.vehicleTypes+this.nodes+this.lines+this.paths == 0) {
            return "No new objects created";
        }
        return "Vehicle Types: " + this.vehicleTypes + '\n'
          + "Nodes: " + this.nodes + '\n'
          + "Lines: " + this.lines + '\n'
          + "paths: " + this.paths + '\n';
  }
}
