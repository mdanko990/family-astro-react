type Story = {
    date?: string;
    place?: string;
  }

type Marriage = Event & {
  partnerId?: string;
  childrenIds?: string[];
}

type Member = {
  id: string;
  gender: 'F' | 'M';
  firstname: string;
  patronym?: string;
  lastname: string;
  birth?: Story,
  death?: Story,
  marriages?: Marriage[],
  isDraft: boolean
};
