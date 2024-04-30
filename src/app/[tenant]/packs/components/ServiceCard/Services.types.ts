export interface Service {
  id: string;
  name: string;
  type: string;
  duration: string;
  capacity: number;
  active: boolean;
  createdat: string;
  updatedat: string;
}

export interface Props {
  service: Service;
}
