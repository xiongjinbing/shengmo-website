const values = new URLSearchParams(window.location.search).getAll('code');
const code = values.length === 1 ? values[0].trim().toUpperCase() : '';
if (/^[A-Z0-9]{8,32}$/.test(code)) {
  document.getElementById('invite').hidden = false;
  document.getElementById('missing').hidden = true;
  document.getElementById('code').textContent = code;
  document.getElementById('copy').addEventListener('click', async () => {
    const status = document.getElementById('copy-status');
    try {
      await navigator.clipboard.writeText(code);
      status.textContent = '邀请码已复制。请在客户端注册时粘贴。';
    } catch {
      status.textContent = '无法自动复制。请选中上方的邀请码并手动复制。';
    }
  });
}

fetch('/downloads/release.json')
  .then(response => {
    if (!response.ok) throw new Error('Release metadata unavailable');
    return response.json();
  })
  .then(release => {
    const url = new URL(release.url);
    if (url.protocol === 'https:' && url.hostname === 'github.com' &&
        /^\/xiongjinbing\/shengmo-releases\/releases\/download\/v[\d.]+\/[\w.-]+\.exe$/.test(url.pathname)) {
      document.getElementById('download').href = url.href;
    }
  })
  .catch(() => {});
