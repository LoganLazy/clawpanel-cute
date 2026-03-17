// 关于页面（已清空）
export async function render() {
  const page = document.createElement('div')
  page.className = 'page'
  page.innerHTML = `
    <div class="page-header">
      <h1 class="page-title">关于</h1>
      <p class="page-desc">内容待补充</p>
    </div>
  `
  return page
}
