export interface UserData {
    name: string;
    lastName: string;
    email: string;
    password: string;
    permissions?: { create: { permission: { connect: { id: number } } }[] };
    packs?: { create: { pack: { connect: { id: number } } }[] };
    shifts?: { create: { shift: { connect: { id: number } } }[] };
  }