import cx from 'classnames';
import { forwardRef } from 'react';

type Props = {
  template: 'cols' | 'rows';
  className?: string;
  defaultClass?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
  rounded?: boolean;
  children: React.ReactNode;
};

const Grid = forwardRef<HTMLDivElement, Props>(function Grid(
  { template = 'cols', className, defaultClass, sm, md, lg, xl, rounded = true, children },
  ref
) {
  const colTemplateClasses = 'grid-flow-row gap-2';
  const rowTemplateClasses = 'grid-flow-col gap-2';

  if (!defaultClass) {
    defaultClass = template === 'rows' ? 'grid-rows-1' : 'grid-cols-1';
  }
  if (!sm) {
    sm = template === 'rows' ? 'sm:grid-rows-2' : 'sm:grid-cols-2';
  }
  if (!md) {
    md = template === 'rows' ? 'md:grid-rows-3' : 'md:grid-cols-3';
  }
  if (!lg) {
    lg = template === 'rows' ? 'lg:grid-rows-3' : 'lg:grid-cols-3';
  }
  if (!xl) {
    xl = template === 'rows' ? 'xl:grid-rows-4' : 'xl:grid-cols-4';
  }

  const classes = cx(
    'grid',
    template === 'rows' ? rowTemplateClasses : colTemplateClasses,
    {
      [defaultClass]: true,
      [sm]: true,
      [md]: true,
      [lg]: true,
      [xl]: true,
      'rounded-md': rounded,
    },
    className
  );

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
});

export default Grid;
