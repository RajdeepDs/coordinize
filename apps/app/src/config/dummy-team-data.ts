export interface MembersData {
  name: string;
  email: string;
  status: string;
  joinedAt: Date;
}

export const dummyMembersData: MembersData[] = [
  {
    name: "John Doe",
    email: "johndoe@example.com",
    status: "Admin",
    joinedAt: new Date("2023-01-01"),
  },
  {
    name: "Jane Smith",
    email: "janesmith@example.com",
    status: "Member",
    joinedAt: new Date("2023-02-15"),
  },
  {
    name: "Bob Johnson",
    email: "bobjohnson@example.com",
    status: "Member",
    joinedAt: new Date("2023-03-10"),
  },
];
