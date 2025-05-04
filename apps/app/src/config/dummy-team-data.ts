export interface TeamData {
  name: string;
  teamId: string;
  membersCount: number;
  postsCount: number;
  createdAt: Date;
}

export const dummyTeamData: TeamData[] = [
  {
    name: "Engineering Team",
    teamId: "ENG",
    membersCount: 12,
    postsCount: 156,
    createdAt: new Date("2023-01-15"),
  },
  {
    name: "Marketing Squad",
    teamId: "MKT",
    membersCount: 8,
    postsCount: 234,
    createdAt: new Date("2023-03-22"),
  },
  {
    name: "Design Studio",
    teamId: "DES",
    membersCount: 6,
    postsCount: 89,
    createdAt: new Date("2023-06-10"),
  },
  {
    name: "Product Management",
    teamId: "PM",
    membersCount: 5,
    postsCount: 178,
    createdAt: new Date("2023-08-05"),
  },
  {
    name: "Customer Support",
    teamId: "CS",
    membersCount: 15,
    postsCount: 312,
    createdAt: new Date("2023-11-30"),
  },
];
