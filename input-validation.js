/* Validate visible inputs before arithmetic; never silently substitute invalid values. */
window.validatePayInputs = function () {
  const main = document.querySelector('#calculator');
  if (!main) return true;
  let invalid = false;
  main.querySelectorAll('input[type="number"]').forEach(input => {
    if (!input.getClientRects().length) return;
    const number = Number(input.value);
    let message = '';
    if (input.value.trim() === '' || !Number.isFinite(number)) message = 'Enter a number to calculate.';
    else if (input.min !== '' && number < Number(input.min)) message = 'Enter ' + input.min + ' or more.';
    else if (input.max !== '' && number > Number(input.max)) message = 'Enter ' + input.max + ' or less.';
    else if (Math.abs(number) > 1e12) message = 'Use a value no greater than 1 trillion.';
    else if (input.validity.stepMismatch) message = 'Enter a whole number.';
    const errorId = input.id + '-error';
    let error = document.getElementById(errorId);
    if (message) {
      invalid = true;
      input.setAttribute('aria-invalid','true');
      if (!error) { error = document.createElement('span'); error.id=errorId; error.className='wp-input-error'; input.after(error); }
      error.textContent=message;
      const ids = new Set((input.getAttribute('aria-describedby')||'').split(' ').filter(Boolean)); ids.add(errorId);
      input.setAttribute('aria-describedby',[...ids].join(' '));
    } else {
      input.removeAttribute('aria-invalid'); error?.remove();
      const ids=(input.getAttribute('aria-describedby')||'').split(' ').filter(id=>id && id!==errorId);
      if(ids.length)input.setAttribute('aria-describedby',ids.join(' '));else input.removeAttribute('aria-describedby');
    }
  });
  let status=document.getElementById('calculation-status');
  if(!status){status=document.createElement('p');status.id='calculation-status';status.setAttribute('role','status');main.querySelector('.calc-card,.input-panel')?.append(status);}
  status.textContent=invalid?'Correct the highlighted inputs. Results are unavailable until the values are valid.':'';
  main.querySelectorAll('.result,.result-panel,.hourly-result-panel,#breakdown,.answer-grid').forEach(el=>{
    if(!el.querySelector('input,select,textarea'))el.hidden=invalid;
  });
  document.querySelectorAll('[data-copy-result],[data-export-timecard]').forEach(el=>el.disabled=invalid);
  return !invalid;
};
