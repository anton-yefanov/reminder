import { withErrorBoundary, withSuspense } from '@extension/shared';

const Popup = () => {
  return (
    <div className="w-full bg-amber-600">
      <button className="btn-active">Button</button>
    </div>
  );
};

export default withErrorBoundary(withSuspense(Popup, <div> Loading ... </div>), <div> Error Occur </div>);
