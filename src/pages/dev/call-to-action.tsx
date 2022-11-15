import { DevPageLayout } from '../../components/Layouts/DevPageLayout';
import { CallToAction } from '../../components/CallToAction/CallToAction';

export const CtaPage = () => (
  <DevPageLayout title="CTA">
    <div className="my-4">
      <CallToAction
        theme="primary"
        role="reset"
        variant="outlined"
        as="button"
        onClick={() => {
          console.log('click on Button with primary color and variant outlined');
        }}
      >
        Button with reset role
      </CallToAction>
    </div>
    <div className="my-4">
      <CallToAction
        theme="primary"
        variant="outlined"
        as="button"
        onClick={() => {
          console.log('click on Button with primary color and variant outlined');
        }}
      >
        Button with primary color and variant outlined
      </CallToAction>
    </div>
    <div className="my-4">
      <CallToAction
        theme="secondary"
        variant="contained"
        as="button"
        onClick={() => {
          console.log('click on cta');
        }}
      >
        Button with secondary color and variant contained
      </CallToAction>
    </div>
    <div className="my-4">
      <CallToAction
        theme="primary"
        variant="contained"
        as="button"
        onClick={() => {
          console.log('click on cta');
        }}
      >
        Button with theme primary and variant contained
      </CallToAction>
    </div>
    <div className="my-4">
      <CallToAction theme="secondary" href="#">
        Link with theme secondary
      </CallToAction>
    </div>
    <div className="my-4">
      <CallToAction theme="primary" href="#">
        Link with theme primary
      </CallToAction>
    </div>
    <div className="my-4">
      <CallToAction theme="grey" href="#">
        Link with theme grey
      </CallToAction>
    </div>
  </DevPageLayout>
);

export default CtaPage;
