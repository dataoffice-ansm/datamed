import type { SelectOption } from '../../components/Select';
import { Select } from '../../components/Select';
import { DevPageLayout } from '../../components/Layouts/DevPageLayout';

const SelectPage = () => {
  const items: SelectOption[] = [
    { value: 1, label: 'Option1' },
    { value: 2, label: 'Option2 - Disabled', disabled: true },
    { value: 3, label: 'Option3' },
    { value: 4, label: 'Option4' },
  ];

  return (
    <DevPageLayout title="Select">
      <div className="flex flex-col mb-8">
        <div className="text-bold text-xl py-4">Example with disabled option</div>
        <div>
          <Select options={items} />
        </div>
      </div>
      <div className="flex flex-col mb-8">
        <div className="text-bold text-xl py-4">Example with secondary theme</div>
        <div>
          <Select options={items} theme="secondary" />
        </div>
      </div>
      <div className="flex flex-col mb-8">
        <div className="text-bold text-xl py-4">Example with gray theme</div>
        <div>
          <Select options={items} theme="gray" />
        </div>
      </div>
      <div className="flex flex-col mb-8">
        <div className="text-bold text-xl py-4">Example with initial value</div>
        <div>
          <Select defaultOptionIndex={2} options={items} />
        </div>
      </div>
      <div className="flex flex-col mb-8">
        <div className="text-bold text-xl py-4">Example with empty values</div>
        <div>
          <Select options={[]} />
        </div>
      </div>
    </DevPageLayout>
  );
};

export default SelectPage;
