import { DevPageLayout } from '../../components/Layouts/DevLayout';

const UiPage = () => (
  <DevPageLayout title="Palette colors">
    <div className="container mb-5">
      <h2 className="underline"> Typos </h2>

      <ul>
        <li>
          <h1 className="inline-block">Heading 1</h1>
        </li>
        <li>
          <h2 className="inline-block">Heading 2</h2>
        </li>
        <li>
          <h3 className="inline-block">Heading 3</h3>
        </li>
        <li>
          <h4 className="inline-block">Heading 4</h4>
        </li>
        <li>
          <h5 className="inline-block">Heading 5</h5>
        </li>
        <li>
          <h6 className="inline-block">Heading 6</h6>
        </li>
      </ul>

      <h2 className="underline">UI / Colors Datamed</h2>

      <div className="flex flex-wrap gap-2 my-4">
        <div className="flex-1">
          <h4 className="text-xl">Primary</h4>
          <div className="p-4 bg-primary-50">50 (light)</div>
          <div className="p-4 bg-primary-100">100</div>
          <div className="p-4 bg-primary-200">200</div>
          <div className="p-4 bg-primary-300">300</div>
          <div className="p-4 bg-primary-400">400</div>
          <div className="p-4 bg-primary-500">500</div>
          <div className="p-4 bg-primary-600">600</div>
          <div className="p-4 bg-primary-700">700</div>
          <div className="p-4 bg-primary-800">800</div>
          <div className="p-4 bg-primary-900">900 (DEFAULT)</div>
        </div>

        <div className="flex-1">
          <h4 className="text-xl">Primary Variant</h4>
          <div className="p-4 font-bold bg-primary-variant-50">50 (light)</div>
          <div className="p-4 font-bold bg-primary-variant-100">100</div>
          <div className="p-4 font-bold bg-primary-variant-200">200</div>
          <div className="p-4 font-bold bg-primary-variant-300">300</div>
          <div className="p-4 font-bold bg-primary-variant-400">400</div>
          <div className="p-4 font-bold bg-primary-variant-500">500</div>
          <div className="p-4 font-bold bg-primary-variant-600">600</div>
          <div className="p-4 font-bold bg-primary-variant-700">700</div>
          <div className="p-4 font-bold bg-primary-variant-800 text-white">800</div>
          <div className="p-4 font-bold bg-primary-variant-900 text-white">900 (DEFAULT)</div>
        </div>

        <div className="flex-1">
          <h4 className="text-xl">Secondary</h4>
          <div className="p-4 font-bold bg-secondary-50">50</div>
          <div className="p-4 font-bold bg-secondary-100">100</div>
          <div className="p-4 font-bold bg-secondary-200">200</div>
          <div className="p-4 font-bold bg-secondary-300">300</div>
          <div className="p-4 font-bold bg-secondary-400">400</div>
          <div className="p-4 font-bold bg-secondary-500">500 (DEFAULT)</div>
          <div className="p-4 font-bold bg-secondary-600">600</div>
          <div className="p-4 font-bold bg-secondary-700">700</div>
          <div className="p-4 font-bold bg-secondary-800">800</div>
          <div className="p-4 font-bold bg-secondary-900 text-white">900</div>
        </div>

        <div className="flex-1">
          <h4 className="text-xl">Secondary Variant</h4>
          <div className="p-4 font-bold bg-secondary-variant-50">50</div>
          <div className="p-4 font-bold bg-secondary-variant-100">100</div>
          <div className="p-4 font-bold bg-secondary-variant-200">200</div>
          <div className="p-4 font-bold bg-secondary-variant-300">300</div>
          <div className="p-4 font-bold bg-secondary-variant-400">400</div>
          <div className="p-4 font-bold bg-secondary-variant-500">500</div>
          <div className="p-4 font-bold bg-secondary-variant-600">600</div>
          <div className="p-4 font-bold bg-secondary-variant-700">700</div>
          <div className="p-4 font-bold bg-secondary-variant-800">800</div>
          <div className="p-4 font-bold bg-secondary-variant-900">900 (DEFAULT)</div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <div className="flex-1">
          <h4 className="text-xl">Primary Chart</h4>
          <div className="p-4 bg-primary-chart">primary-chart</div>
          <div className="p-4 bg-primary-chart-1">primary-chart-1</div>
          <div className="p-4 bg-primary-chart-2">primary-chart-2</div>
          <div className="p-4 bg-primary-chart-3">primary-chart-3</div>
          <div className="p-4 bg-primary-chart-4">primary-chart-4</div>
          <div className="p-4 bg-primary-chart-5">primary-chart-5</div>
          <div className="p-4 bg-primary-chart-6">primary-chart-6</div>
          <div className="p-4 bg-primary-chart-7">primary-chart-7</div>
        </div>

        <div className="flex-1">
          <h4 className="text-xl">Secondary Chart</h4>
          <div className="p-4 bg-secondary-chart">secondary-chart</div>
          <div className="p-4 bg-secondary-chart-1">secondary-chart-1</div>
          <div className="p-4 bg-secondary-chart-2">secondary-chart-2</div>
          <div className="p-4 bg-secondary-chart-3">secondary-chart-3</div>
          <div className="p-4 bg-secondary-chart-4">secondary-chart-4</div>
          <div className="p-4 bg-secondary-chart-5">secondary-chart-5</div>
          <div className="p-4 bg-secondary-chart-6">secondary-chart-6</div>
          <div className="p-4 bg-secondary-chart-7">secondary-chart-7</div>
        </div>

        <div className="flex-1">
          <h4 className="text-xl">Bootstrap</h4>
          <div className="p-4 bg-error">error</div>
          <div className="p-4 bg-success">success</div>
          <div className="p-4 bg-warning">warning</div>
          <div className="p-4 bg-info">info</div>
          <div className="p-4 bg-tags">tags</div>
        </div>

        <div className="flex-1">
          <h4 className="text-xl">Others </h4>
          <div className="p-4 bg-surface">surface</div>
          <div className="p-4 bg-background">background</div>
          <div className="p-4 bg-secondary-background">secondary-background</div>
          <div className="p-4 bg-border">border</div>
          <div className="p-4 bg-menu-inactive">menu-inactive</div>
          <div className="p-4 text-white bg-menu-active">menu-active</div>
          <div className="p-4 bg-black text-white">black</div>
        </div>
      </div>

      <h3 className="mt-16 mb-2 text-xl">Colors Palette</h3>

      <div className="flex flex-wrap gap-2">
        <div>
          <div className="p-4 font-bold text-white bg-dark-violet">
            <strong>DARK VIOLET</strong>
            <div>800 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-dark-violet-50">50 (light)</div>
          <div className="p-4 font-bold bg-dark-violet-100">100</div>
          <div className="p-4 font-bold bg-dark-violet-200">200</div>
          <div className="p-4 font-bold bg-dark-violet-300">300</div>
          <div className="p-4 font-bold bg-dark-violet-400">400</div>
          <div className="p-4 font-bold bg-dark-violet-500">500</div>
          <div className="p-4 font-bold bg-dark-violet-600">600</div>
          <div className="p-4 font-bold bg-dark-violet-700">700</div>
          <div className="p-4 font-bold bg-dark-violet-800 text-white">800</div>
          <div className="p-4 font-bold bg-dark-violet-900 text-white">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold text-white bg-light-violet">
            <strong>LIGHT VIOLET</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-light-violet-50">50</div>
          <div className="p-4 font-bold bg-light-violet-100">100</div>
          <div className="p-4 font-bold bg-light-violet-200">200</div>
          <div className="p-4 font-bold bg-light-violet-300">300</div>
          <div className="p-4 font-bold bg-light-violet-400">400</div>
          <div className="p-4 font-bold bg-light-violet-500">500</div>
          <div className="p-4 font-bold bg-light-violet-600">600</div>
          <div className="p-4 font-bold bg-light-violet-700">700</div>
          <div className="p-4 font-bold bg-light-violet-800 text-white">800</div>
          <div className="p-4 font-bold bg-light-violet-900 text-white">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold text-white bg-orange">
            <strong>ORANGE</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-orange-50">50</div>
          <div className="p-4 font-bold bg-orange-100">100</div>
          <div className="p-4 font-bold bg-orange-200">200</div>
          <div className="p-4 font-bold bg-orange-300">300</div>
          <div className="p-4 font-bold bg-orange-400">400</div>
          <div className="p-4 font-bold bg-orange-500">500</div>
          <div className="p-4 font-bold bg-orange-600">600</div>
          <div className="p-4 font-bold bg-orange-700">700</div>
          <div className="p-4 font-bold bg-orange-800">800</div>
          <div className="p-4 font-bold bg-orange-900 text-white">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold text-white bg-red">
            <strong>RED</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-red-50">50</div>
          <div className="p-4 font-bold bg-red-100">100</div>
          <div className="p-4 font-bold bg-red-200">200</div>
          <div className="p-4 font-bold bg-red-300">300</div>
          <div className="p-4 font-bold bg-red-400">400</div>
          <div className="p-4 font-bold bg-red-500">500</div>
          <div className="p-4 font-bold bg-red-600">600</div>
          <div className="p-4 font-bold bg-red-700">700</div>
          <div className="p-4 font-bold bg-red-800">800</div>
          <div className="p-4 font-bold bg-red-900 text-white">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold text-white bg-turquoise">
            <strong>TURQUOISE</strong>
            <div>500 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-turquoise-50">50</div>
          <div className="p-4 font-bold bg-turquoise-100">100</div>
          <div className="p-4 font-bold bg-turquoise-200">200</div>
          <div className="p-4 font-bold bg-turquoise-300">300</div>
          <div className="p-4 font-bold bg-turquoise-400">400</div>
          <div className="p-4 font-bold bg-turquoise-500">500 (DEFAULT)</div>
          <div className="p-4 font-bold bg-turquoise-600">600</div>
          <div className="p-4 font-bold bg-turquoise-700">700</div>
          <div className="p-4 font-bold bg-turquoise-800">800</div>
          <div className="p-4 font-bold bg-turquoise-900 text-white">900</div>
        </div>

        <div>
          <div className="p-4 font-bold text-white bg-green">
            <strong>GREEN</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-green-50">50</div>
          <div className="p-4 font-bold bg-green-100">100</div>
          <div className="p-4 font-bold bg-green-200">200</div>
          <div className="p-4 font-bold bg-green-300">300</div>
          <div className="p-4 font-bold bg-green-400">400</div>
          <div className="p-4 font-bold bg-green-500">500</div>
          <div className="p-4 font-bold bg-green-600">600</div>
          <div className="p-4 font-bold bg-green-700">700</div>
          <div className="p-4 font-bold bg-green-800">800</div>
          <div className="p-4 font-bold bg-green-900 text-white">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold text-white bg-dark-green">
            <strong>DARK GREEN</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-dark-green-50">50</div>
          <div className="p-4 font-bold bg-dark-green-100">100</div>
          <div className="p-4 font-bold bg-dark-green-200">200</div>
          <div className="p-4 font-bold bg-dark-green-300">300</div>
          <div className="p-4 font-bold bg-dark-green-400">400</div>
          <div className="p-4 font-bold bg-dark-green-500">500</div>
          <div className="p-4 font-bold bg-dark-green-600">600</div>
          <div className="p-4 font-bold bg-dark-green-700">700</div>
          <div className="p-4 font-bold bg-dark-green-800">800</div>
          <div className="p-4 font-bold bg-dark-green-900 text-white">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold text-white bg-dark-blue">
            <strong>DARK BLUE</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-dark-blue-50">50</div>
          <div className="p-4 font-bold bg-dark-blue-100">100</div>
          <div className="p-4 font-bold bg-dark-blue-200">200</div>
          <div className="p-4 font-bold bg-dark-blue-300">300</div>
          <div className="p-4 font-bold bg-dark-blue-400">400</div>
          <div className="p-4 font-bold bg-dark-blue-500">500</div>
          <div className="p-4 font-bold bg-dark-blue-600">600</div>
          <div className="p-4 font-bold bg-dark-blue-700">700</div>
          <div className="p-4 font-bold bg-dark-blue-800 text-white">800</div>
          <div className="p-4 font-bold bg-dark-blue-900 text-white">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold text-white bg-blue">
            <strong>BLUE</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-blue-20">20</div>
          <div className="p-4 font-bold bg-blue-50">50</div>
          <div className="p-4 font-bold bg-blue-100">100</div>
          <div className="p-4 font-bold bg-blue-200">200</div>
          <div className="p-4 font-bold bg-blue-300">300</div>
          <div className="p-4 font-bold bg-blue-400">400</div>
          <div className="p-4 font-bold bg-blue-500">500</div>
          <div className="p-4 font-bold bg-blue-600">600</div>
          <div className="p-4 font-bold bg-blue-700">700</div>
          <div className="p-4 font-bold bg-blue-800 text-white">800</div>
          <div className="p-4 font-bold bg-blue-900 text-white">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold text-white bg-dark-yellow">
            <strong>DARK YELLOW</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-dark-yellow-50">50</div>
          <div className="p-4 font-bold bg-dark-yellow-100">100</div>
          <div className="p-4 font-bold bg-dark-yellow-200">200</div>
          <div className="p-4 font-bold bg-dark-yellow-300">300</div>
          <div className="p-4 font-bold bg-dark-yellow-400">400</div>
          <div className="p-4 font-bold bg-dark-yellow-500">500</div>
          <div className="p-4 font-bold bg-dark-yellow-600">600</div>
          <div className="p-4 font-bold bg-dark-yellow-700">700</div>
          <div className="p-4 font-bold bg-dark-yellow-800 text-white">800</div>
          <div className="p-4 font-bold bg-dark-yellow-900 text-white">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold bg-yellow">
            <strong>YELLOW</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-yellow-50">50</div>
          <div className="p-4 font-bold bg-yellow-100">100</div>
          <div className="p-4 font-bold bg-yellow-200">200</div>
          <div className="p-4 font-bold bg-yellow-300">300</div>
          <div className="p-4 font-bold bg-yellow-400">400</div>
          <div className="p-4 font-bold bg-yellow-500">500</div>
          <div className="p-4 font-bold bg-yellow-600">600</div>
          <div className="p-4 font-bold bg-yellow-700">700</div>
          <div className="p-4 font-bold bg-yellow-800">800</div>
          <div className="p-4 font-bold bg-yellow-900">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold text-white bg-dark-red">
            <strong>DARK RED</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-dark-red-50">50</div>
          <div className="p-4 font-bold bg-dark-red-100">100</div>
          <div className="p-4 font-bold bg-dark-red-200">200</div>
          <div className="p-4 font-bold bg-dark-red-300">300</div>
          <div className="p-4 font-bold bg-dark-red-400">400</div>
          <div className="p-4 font-bold bg-dark-red-500">500</div>
          <div className="p-4 font-bold bg-dark-red-600">600</div>
          <div className="p-4 font-bold bg-dark-red-700">700</div>
          <div className="p-4 font-bold bg-dark-red-800 text-white">800</div>
          <div className="p-4 font-bold bg-dark-red-900 text-white">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold text-white bg-pink">
            <strong>PINK</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-pink-50">50</div>
          <div className="p-4 font-bold bg-pink-100">100</div>
          <div className="p-4 font-bold bg-pink-200">200</div>
          <div className="p-4 font-bold bg-pink-300">300</div>
          <div className="p-4 font-bold bg-pink-400">400</div>
          <div className="p-4 font-bold bg-pink-500">500</div>
          <div className="p-4 font-bold bg-pink-600">600</div>
          <div className="p-4 font-bold bg-pink-700">700</div>
          <div className="p-4 font-bold bg-pink-800 text-white">800</div>
          <div className="p-4 font-bold bg-pink-900 text-white">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold text-white bg-teal">
            <strong>TEAL</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-teal-50">50</div>
          <div className="p-4 font-bold bg-teal-100">100</div>
          <div className="p-4 font-bold bg-teal-200">200</div>
          <div className="p-4 font-bold bg-teal-300">300</div>
          <div className="p-4 font-bold bg-teal-400">400</div>
          <div className="p-4 font-bold bg-teal-500">500</div>
          <div className="p-4 font-bold bg-teal-600">600</div>
          <div className="p-4 font-bold bg-teal-700">700</div>
          <div className="p-4 font-bold bg-teal-800 text-white">800</div>
          <div className="p-4 font-bold bg-teal-900 text-white">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold bg-mint">
            <strong>MINT</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-mint-50">50</div>
          <div className="p-4 font-bold bg-mint-100">100</div>
          <div className="p-4 font-bold bg-mint-200">200</div>
          <div className="p-4 font-bold bg-mint-300">300</div>
          <div className="p-4 font-bold bg-mint-400">400</div>
          <div className="p-4 font-bold bg-mint-500">500</div>
          <div className="p-4 font-bold bg-mint-600">600</div>
          <div className="p-4 font-bold bg-mint-700">700</div>
          <div className="p-4 font-bold bg-mint-800">800</div>
          <div className="p-4 font-bold bg-mint-900">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold bg-skin-1">
            <strong>SKIN 1</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-skin-1-50">50</div>
          <div className="p-4 font-bold bg-skin-1-100">100</div>
          <div className="p-4 font-bold bg-skin-1-200">200</div>
          <div className="p-4 font-bold bg-skin-1-300">300</div>
          <div className="p-4 font-bold bg-skin-1-400">400</div>
          <div className="p-4 font-bold bg-skin-1-500">500</div>
          <div className="p-4 font-bold bg-skin-1-600">600</div>
          <div className="p-4 font-bold bg-skin-1-700">700</div>
          <div className="p-4 font-bold bg-skin-1-800">800</div>
          <div className="p-4 font-bold bg-skin-1-900">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold bg-skin-2">
            <strong>SKIN 2</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-skin-2-50">50</div>
          <div className="p-4 font-bold bg-skin-2-100">100</div>
          <div className="p-4 font-bold bg-skin-2-200">200</div>
          <div className="p-4 font-bold bg-skin-2-300">300</div>
          <div className="p-4 font-bold bg-skin-2-400">400</div>
          <div className="p-4 font-bold bg-skin-2-500">500</div>
          <div className="p-4 font-bold bg-skin-2-600">600</div>
          <div className="p-4 font-bold bg-skin-2-700">700</div>
          <div className="p-4 font-bold bg-skin-2-800">800</div>
          <div className="p-4 font-bold bg-skin-2-900">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold text-white bg-skin-3">
            <strong>SKIN 3</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-skin-3-50">50</div>
          <div className="p-4 font-bold bg-skin-3-100">100</div>
          <div className="p-4 font-bold bg-skin-3-200">200</div>
          <div className="p-4 font-bold bg-skin-3-300">300</div>
          <div className="p-4 font-bold bg-skin-3-400">400</div>
          <div className="p-4 font-bold bg-skin-3-500">500</div>
          <div className="p-4 font-bold bg-skin-3-600">600</div>
          <div className="p-4 font-bold bg-skin-3-700">700</div>
          <div className="p-4 font-bold bg-skin-3-800 text-white">800</div>
          <div className="p-4 font-bold bg-skin-3-900 text-white">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold text-white bg-skin-4">
            <strong>SKIN 4</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-skin-4-50">50</div>
          <div className="p-4 font-bold bg-skin-4-100">100</div>
          <div className="p-4 font-bold bg-skin-4-200">200</div>
          <div className="p-4 font-bold bg-skin-4-300">300</div>
          <div className="p-4 font-bold bg-skin-4-400">400</div>
          <div className="p-4 font-bold bg-skin-4-500">500</div>
          <div className="p-4 font-bold bg-skin-4-600">600</div>
          <div className="p-4 font-bold bg-skin-4-700">700</div>
          <div className="p-4 font-bold bg-skin-4-800 text-white">800</div>
          <div className="p-4 font-bold bg-skin-4-900 text-white">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold text-white bg-skin-5">
            <strong>SKIN 5</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-skin-5-50">50</div>
          <div className="p-4 font-bold bg-skin-5-100">100</div>
          <div className="p-4 font-bold bg-skin-5-200">200</div>
          <div className="p-4 font-bold bg-skin-5-300">300</div>
          <div className="p-4 font-bold bg-skin-5-400">400</div>
          <div className="p-4 font-bold bg-skin-5-500">500</div>
          <div className="p-4 font-bold bg-skin-5-600">600</div>
          <div className="p-4 font-bold bg-skin-5-700">700</div>
          <div className="p-4 font-bold bg-skin-5-800 text-white">800</div>
          <div className="p-4 font-bold bg-skin-5-900 text-white">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold text-white bg-skin-6">
            <strong>SKIN 6</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-skin-6-50">50</div>
          <div className="p-4 font-bold bg-skin-6-100">100</div>
          <div className="p-4 font-bold bg-skin-6-200">200</div>
          <div className="p-4 font-bold bg-skin-6-300">300</div>
          <div className="p-4 font-bold bg-skin-6-400">400</div>
          <div className="p-4 font-bold bg-skin-6-500">500</div>
          <div className="p-4 font-bold bg-skin-6-600">600</div>
          <div className="p-4 font-bold bg-skin-6-700">700</div>
          <div className="p-4 font-bold bg-skin-6-800 text-white">800</div>
          <div className="p-4 font-bold bg-skin-6-900 text-white">900 (DEFAULT)</div>
        </div>

        <div>
          <div className="p-4 font-bold text-white bg-grey">
            <strong>BLACK/GREY</strong>
            <div>900 - DEFAULT</div>
          </div>
          <div className="p-4 font-bold bg-white">WHITE</div>
          <div className="p-4 font-bold bg-grey-10">10</div>
          <div className="p-4 font-bold bg-grey-50">50</div>
          <div className="p-4 font-bold bg-grey-100">100</div>
          <div className="p-4 font-bold bg-grey-200">200</div>
          <div className="p-4 font-bold bg-grey-300">300</div>
          <div className="p-4 font-bold bg-grey-400">400</div>
          <div className="p-4 font-bold bg-grey-500">500</div>
          <div className="p-4 font-bold bg-grey-600">600</div>
          <div className="p-4 font-bold bg-grey-700">700</div>
          <div className="p-4 font-bold bg-grey-800 text-white">800</div>
          <div className="p-4 font-bold bg-grey-900 text-white">900 (DEFAULT)</div>
          <div className="p-4 font-bold bg-black text-white">BLACK</div>
        </div>
      </div>
    </div>
  </DevPageLayout>
);

export default UiPage;
