import './tmp/Chat'

const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || ''
console.log(token);

fetch('/api/user', {
    method: 'POST',
    body: JSON.stringify({
      '_token': token,
    })
})
  .then(response => response.json())
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
