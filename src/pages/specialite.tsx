import { menuSpecialite } from '../config/menu/menuSpecialite';
import { SideMenu } from '../components/SideMenu/SideMenu';
import { MenuItem } from '../components/SideMenu/MenuItem';

const PageSpecialite = () => {
  const { id, items } = menuSpecialite;
  return (
    <div className="text-center">
      <SideMenu id={id} colorMenu="primary" items={items}>
        {items.map(({ id, label }, i) => (
          <MenuItem key={i} id={id} color="primary">
            {label}
          </MenuItem>
        ))}
      </SideMenu>
      <div id="data-ansm-question" className="w-screen min-h-screen mt-[100px]">
        <h1>Section 1</h1>
      </div>
      <div id="donnees-globales-plateforme" className="w-screen min-h-screen mt-[100px]">
        <h1>Section 2</h1>
      </div>
      <div id="lecture-des-donnees" className="w-screen min-h-screen mt-[100px]">
        <h1>Section 3</h1>
      </div>
    </div>
  );
};

export default PageSpecialite;
