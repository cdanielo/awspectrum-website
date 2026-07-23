export type ModalType = 'sponsor' | 'charla' | 'comunidad' | 'contactGeneral';

export type NodeKey = 'center' | 'aws' | 'devops' | 'lgbt' | 'ai';

export interface NodeInfo {
  title: string;
  description: string;
}

export interface ContactPayload {
  type: string;
  name: string;
  email: string;
  interest: string;
  message: string;
}
