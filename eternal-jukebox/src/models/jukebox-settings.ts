// TODO: Set constants to static / readonly.

/**
 * Settings for the branches of the jukebox.
 */
export class JukeboxSettings {
    /**
     * Max branches (neighbours) allowed per beat.
     */
    maxBranches: number = 4;

    /**
     * Max allowed distance for a branch.
     */
    maxBranchDistance: number = 80;

    /**
     * If true, optimize by adding a good last edge.
     */
    addLastEdge: boolean = true;

    /**
     * If true, only add backward branches.
     */
    justBackwards: boolean = false;

    /**
     * If true, only add long branches.
     */
    justLongBranches: boolean = false;

    /**
     * If true, remove consecutive branches of the same distance.
     */
    removeSequentialBranches: boolean = false;

    minRandomBranchChance: number = 0;
    maxRandomBranchChance: number = 0;
    randomBranchChanceDelta: number = 0;

    minBeatsBeforeBranching: number = 5;

    // configs for chances to branch
    private readonly defaultMinRandomBranchChance: number = 0.18;
    private readonly defaultMaxRandomBranchChance: number = 0.5;

    private readonly defaultRandomBranchChanceDelta: number = 0.018;

    private readonly minRandomBranchChanceDelta: number = 0.0;
    private readonly maxRandomBranchChanceDelta: number = 0.2;

    constructor() {
        this.minRandomBranchChance = this.defaultMinRandomBranchChance;
        this.maxRandomBranchChance = this.defaultMaxRandomBranchChance;
        this.randomBranchChanceDelta = this.defaultRandomBranchChanceDelta;
    }
}
