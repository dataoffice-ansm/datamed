import { DevPageLayout } from '../../components/Layouts/DevPageLayout';
import { Modal } from '../../components/Modal/Modal';
import { useState } from 'react';
import ManFigure from '../../assets/pictos/man_illustration.svg';
import { GraphFigure } from '../../components/GraphFigure';
import { Button } from '../../components/Button/Button';

export const ModalPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <DevPageLayout title="Modal">
      <GraphFigure
        id="graph-figure-homme"
        value={53}
        valueClassName="text-secondary"
        label="Hommes"
        icon={<ManFigure width={150} height={150} />}
        action={
          <Button
            as="button"
            variant="none"
            onClick={() => {
              console.log('click open modal');
              setIsOpen(true);
            }}
          >
            Button
          </Button>
        }
      />
      <Modal
        title="Lorem Ipsum"
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived
        not only five centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets
        containing Lorem Ipsum passages, and more recently with desktop publishing software like
        Aldus PageMaker including versions of Lorem Ipsum
      </Modal>
    </DevPageLayout>
  );
};

export default ModalPage;
