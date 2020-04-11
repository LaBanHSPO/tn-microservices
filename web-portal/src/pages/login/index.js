import { EuiFieldText, EuiFieldPassword } from '@elastic/eui';
import React, { useState } from 'react';


export default function() {
  const [value, setValue] = useState('');

  const onChange = e => {
    setValue(e.target.value);
  };

  return (<>
      <EuiFieldText
        placeholder="Placeholder text"
        value={value}
        onChange={e => onChange(e)}
        aria-label="Use aria labels when no actual label is in use"
      />
      <EuiFieldPassword
        placeholder="Placeholder text"
        value={value}
        onChange={e => onChange(e)}
        aria-label="Use aria labels when no actual label is in use"
      />
      </>
  );
}