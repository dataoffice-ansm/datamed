import { DevPageLayout } from '../../components/Layouts/DevPageLayout';
import { Button } from '../../components/Button/Button';

export const CtaPage = () => (
  <DevPageLayout title="CTA">
    <p>Buttons</p>
    <div className="my-4">
      <Button
        as="button"
        onClick={() => {
          console.log('click on Button');
        }}
      >
        Button
      </Button>
    </div>
    <div className="my-4">
      <Button
        as="button"
        type="reset"
        onClick={() => {
          console.log('click on Button');
        }}
      >
        Reset Button
      </Button>
    </div>
    <div className="my-4">
      <Button
        as="button"
        type="submit"
        onClick={() => {
          console.log('click on Button');
        }}
      >
        Submit Button
      </Button>
    </div>
    <div className="my-4">
      <Button
        as="button"
        theme="primary"
        variant="outlined"
        onClick={() => {
          console.log('click on Button with primary color and variant outlined');
        }}
      >
        Button with primary color and variant outlined
      </Button>
    </div>
    <div className="my-4">
      <Button
        as="button"
        theme="primary"
        variant="contained"
        onClick={() => {
          console.log('click on Button with primary color and variant contained');
        }}
      >
        Button with primary color and variant contained
      </Button>
    </div>
    <div className="my-4">
      <Button
        as="button"
        theme="secondary"
        variant="outlined"
        onClick={() => {
          console.log('click on Button with secondary color and variant outlined');
        }}
      >
        Button with primary color and variant outlined
      </Button>
    </div>
    <div className="my-4">
      <Button
        as="button"
        theme="secondary"
        variant="contained"
        onClick={() => {
          console.log('click on Button with secondary color and variant contained');
        }}
      >
        Button with secondary color and variant contained
      </Button>
    </div>

    <p>Links</p>
    <div className="my-4">
      <Button theme="secondary" href="#">
        Link with theme secondary
      </Button>
    </div>
    <div className="my-4">
      <Button theme="primary" href="#">
        Link with theme primary
      </Button>
    </div>
    <div className="my-4">
      <Button theme="grey" href="#">
        Link with theme grey
      </Button>
    </div>
  </DevPageLayout>
);

export default CtaPage;
