/* eslint-disable react/no-unescaped-entities */
import { DevPageLayout } from '../../components/Layouts/DevPageLayout';
import { BoxInfo } from '../../components/BoxInfo';
import FolderSVG from '../../assets/pictos/folder.svg';

const BoxInfoTitlePage = () => (
  <DevPageLayout title="BoxInfoTitle">
    <div className="flex flex-col mb-8">
      <div className="text-bold text-xl py-4">Primary theme</div>
      <div className="p-8 border bg-grey-50">
        <BoxInfo title="17 538 déclarations reçues" icon={<FolderSVG />}>
          Nombre de déclarations d'effets indésirables sur la période 2014-2018
        </BoxInfo>
      </div>
    </div>
    <div className="flex flex-col mb-8">
      <div className="text-bold text-xl py-4">Secondary theme</div>
      <div className="p-8 border bg-grey-50">
        <BoxInfo title="17 538 déclarations reçues" icon={<FolderSVG />} theme="secondary">
          Nombre de déclarations d'effets indésirables sur la période 2014-2018
        </BoxInfo>
      </div>
    </div>
    <div className="flex flex-col mb-8">
      <div className="text-bold text-xl py-4">Grey theme</div>
      <div className="p-8 border bg-grey-50">
        <BoxInfo title="17 538 déclarations reçues" icon={<FolderSVG />} theme="success">
          Nombre de déclarations d'effets indésirables sur la période 2014-2018
        </BoxInfo>
      </div>
    </div>
    <div className="flex flex-col mb-8">
      <div className="text-bold text-xl py-4">With tooltip</div>
      <div className="p-8 border bg-grey-50">
        <BoxInfo
          title="17 538 déclarations reçues"
          icon={<FolderSVG />}
          tooltip="Ceci est le contenu de ma tooltip"
        >
          Nombre de déclarations d'effets indésirables sur la période 2014-2018
        </BoxInfo>
      </div>
    </div>
  </DevPageLayout>
);

export default BoxInfoTitlePage;
