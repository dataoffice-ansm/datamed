import { DevPageLayout } from '../../components/Layouts/DevPageLayout';
import { CallToAction } from '../../components/CallToAction/CallToAction';

export const CtaPage = () => (
  <DevPageLayout title="CTA">
    <p>Buttons</p>
    <div className="my-4">
      <CallToAction
        as="button"
        onClick={() => {
          console.log('click on Button');
        }}
      >
        Button
      </CallToAction>
    </div>
    <div className="my-4">
      <CallToAction
        as="button"
        type="reset"
        onClick={() => {
          console.log('click on Button');
        }}
      >
        Reset Button
      </CallToAction>
    </div>
    <div className="my-4">
      <CallToAction
        as="button"
        type="submit"
        onClick={() => {
          console.log('click on Button');
        }}
      >
        Submit Button
      </CallToAction>
    </div>
    <div className="my-4">
      <CallToAction
        as="button"
        theme="primary"
        variant="outlined"
        onClick={() => {
          console.log('click on Button with primary color and variant outlined');
        }}
      >
        Button with primary color and variant outlined
      </CallToAction>
    </div>
    <div className="my-4">
      <CallToAction
        as="button"
        theme="primary"
        variant="contained"
        onClick={() => {
          console.log('click on Button with primary color and variant contained');
        }}
      >
        Button with primary color and variant contained
      </CallToAction>
    </div>
    <div className="my-4">
      <CallToAction
        as="button"
        theme="secondary"
        variant="outlined"
        onClick={() => {
          console.log('click on Button with secondary color and variant outlined');
        }}
      >
        Button with primary color and variant outlined
      </CallToAction>
    </div>
    <div className="my-4">
      <CallToAction
        as="button"
        theme="secondary"
        variant="contained"
        onClick={() => {
          console.log('click on Button with secondary color and variant contained');
        }}
      >
        Button with secondary color and variant contained
      </CallToAction>
    </div>

    <p>Links</p>
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
