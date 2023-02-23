import { Edge } from '../graph/edge';

export interface IEdgeDrawData {
    edge: Edge;

    strokeWidth: number;
    drawCommand: string;

    color: string;
    activeColor: string;
}
