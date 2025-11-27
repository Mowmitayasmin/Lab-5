export interface Role {
  id: number;
  title: string;
  description: string;
}

export interface Employee {
  id?: string | number;
  department: string;
  employees: string | number | boolean | object | null;
}
