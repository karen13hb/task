export interface Task { 
    id: number; 
    title: string; 
    description: string; 
    assignedTo: string;
    dueDate: Date;
    completed: boolean; 
}