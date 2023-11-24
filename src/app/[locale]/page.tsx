import { SearchParams } from 'api';
import IndexLayout from '~/layout/IndexLayout';

type Props = {
  searchParams: SearchParams;
};

export default async function Index({ searchParams }: Props) {
  return <IndexLayout fullSize searchParams={searchParams} />;
}
