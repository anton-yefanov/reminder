import { Popover } from 'react-tiny-popover';
import { useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

export const Reminder = () => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <div>
      <Popover
        isOpen={isPopoverOpen}
        onClickOutside={() => setIsPopoverOpen(false)}
        positions={['right']}
        content={
          <div>
            <Picker data={data} emojiSize={20} emojiButtonSize={32} noCountryFlags={true} previewPosition="none" />
          </div>
        }>
        <button onClick={() => setIsPopoverOpen(!isPopoverOpen)}>3423</button>
      </Popover>
    </div>
  );
};
