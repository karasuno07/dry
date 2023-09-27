import { IconBaseProps } from 'react-icons';

type Props = {
  component: React.FunctionComponentElement<IconBaseProps>;
};

export default function Icon({ component }: Props) {
  return <span className='react-icons'>{component}</span>;
}
