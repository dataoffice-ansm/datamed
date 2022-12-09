/**
 *
 * @param title
 * @param subTitle
 * @constructor
 */
import classnames from 'classnames';

export const SectionTitle = ({ title, subTitle }: { title: string; subTitle?: string }) => (
  <div className="SectionTitle">
    <h2 className={classnames('text-2xl lg:text-3xl text-left font-medium', subTitle && 'mb-1')}>
      {title}
    </h2>
    {subTitle && <h6 className="mt-0 mb-6">{subTitle}</h6>}
  </div>
);
