// 公共JavaScript功能
document.addEventListener('DOMContentLoaded', function () {
  // 设置当前页面导航项为活动状态
  setActiveNavItem();

  // 初始化搜索功能
  initSearch();
});

// 设置活动导航项
function setActiveNavItem() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// 初始化搜索功能
function initSearch() {
  const searchInput = document.querySelector('.search-bar input');
  if (searchInput) {
    searchInput.addEventListener('keyup', function (e) {
      if (e.key === 'Enter') {
        const searchTerm = this.value.trim();
        if (searchTerm) {
          performSearch(searchTerm);
        }
      }
    });
  }
}

// 执行搜索
function performSearch(term) {
  alert(`正在搜索: "${term}"，在实际系统中这里会执行搜索功能`);
  // 在实际应用中，这里会向服务器发送搜索请求并更新页面内容
}

// 显示确认对话框
function showConfirm(message, callback) {
  if (confirm(message)) {
    if (typeof callback === 'function') {
      callback();
    }
  }
}

// 显示成功消息
function showSuccess(message) {
  alert('成功: ' + message);
  // 在实际应用中，可以使用更漂亮的提示框
}

// 显示错误消息
function showError(message) {
  alert('错误: ' + message);
  // 在实际应用中，可以使用更漂亮的提示框
}
// 访客登记功能
function registerVisitor() {
  const name = document.getElementById('visitorName').value;
  const phone = document.getElementById('visitorPhone').value;
  const student = document.getElementById('studentName').value;
  const building = document.getElementById('dormBuilding').value;
  const room = document.getElementById('roomNumber').value;

  if (!name || !phone || !student || !building || !room) {
    alert('请填写带 * 号的必填项');
    return;
  }

  // 获取当前时间
  const now = new Date();
  const entryTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

  // 创建新的访客记录
  const visitorCard = document.createElement('div');
  visitorCard.className = 'visitor-card active';
  visitorCard.innerHTML = `
                <div class="visitor-header">
                    <div class="visitor-name">${name}</div>
                    <span class="status status-processing">访问中</span>
                </div>
                <div class="visitor-meta">
                    <div><strong>访问学生：</strong>${student}</div>
                    <div><strong>宿舍：</strong>${building}号楼-${room}</div>
                    <div><strong>进入时间：</strong>${entryTime}</div>
                </div>
                <div class="visitor-actions">
                    <button class="btn btn-success btn-sm" onclick="checkOutVisitor(${Date.now()})">确认离开</button>
                    <button class="btn btn-warning btn-sm" onclick="extendVisit(${Date.now()})">延长访问</button>
                    <button class="btn btn-primary btn-sm" onclick="viewVisitorDetails(${Date.now()})">详情</button>
                </div>
            `;

  // 添加到列表顶部
  const visitorRecords = document.getElementById('visitorRecords');
  visitorRecords.insertBefore(visitorCard, visitorRecords.firstChild);

  // 更新统计数字
  const todayVisitors = document.querySelector('.today-stats .stat-card:nth-child(1) .stat-number');
  const activeVisitors = document.querySelector('.today-stats .stat-card:nth-child(2) .stat-number');
  todayVisitors.textContent = parseInt(todayVisitors.textContent) + 1;
  activeVisitors.textContent = parseInt(activeVisitors.textContent) + 1;

  // 清空表单
  document.getElementById('visitorName').value = '';
  document.getElementById('visitorPhone').value = '';
  document.getElementById('studentName').value = '';
  document.getElementById('studentId').value = '';
  document.getElementById('dormBuilding').value = '';
  document.getElementById('roomNumber').value = '';
  document.getElementById('visitNotes').value = '';

  alert(`访客 ${name} 登记成功！`);
}

function quickRegister() {
  // 快速登记模式
  document.getElementById('visitorName').focus();
}

function scanIDCard() {
  alert('身份证扫描功能将在后续版本中实现');
}

function exportVisitorData() {
  alert('访客记录导出功能将在后续版本中实现');
}

function showBlacklist() {
  alert('黑名单管理功能将在后续版本中实现');
}

function openQRScanner() {
  alert('二维码扫描功能将在后续版本中实现');
}

function filterVisitors(filter) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');

  // 在实际应用中，这里会根据筛选条件过滤访客记录
  alert(`筛选访客: ${filter}`);
}

function checkOutVisitor(visitorId) {
  if (confirm('确认访客已离开？')) {
    const card = event.target.closest('.visitor-card');
    card.classList.remove('active');
    card.classList.add('completed');

    // 更新状态
    const statusSpan = card.querySelector('.status');
    statusSpan.className = 'status status-completed';
    statusSpan.textContent = '已离开';

    // 设置离开时间
    const now = new Date();
    const leaveTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    const timeDiv = card.querySelector('.visitor-meta div:nth-child(3)');
    const entryTime = timeDiv.textContent.split('：')[1];
    timeDiv.innerHTML = `<strong>时间：</strong>${entryTime} - ${leaveTime}`;

    // 更新统计数字
    const activeVisitors = document.querySelector('.today-stats .stat-card:nth-child(2) .stat-number');
    const completedVisitors = document.querySelector('.today-stats .stat-card:nth-child(3) .stat-number');
    activeVisitors.textContent = parseInt(activeVisitors.textContent) - 1;
    completedVisitors.textContent = parseInt(completedVisitors.textContent) + 1;

    alert('访客离开登记成功！');
  }
}

function extendVisit(visitorId) {
  const newTime = prompt('请输入新的预计离开时间 (HH:mm)：', '20:00');
  if (newTime) {
    alert(`访客 ${visitorId} 的访问时间已延长至 ${newTime}`);
  }
}

function viewVisitorDetails(visitorId) {
  alert(`查看访客 ${visitorId} 的详细信息`);
}

function printReceipt(visitorId) {
  alert(`打印访客 ${visitorId} 的访问凭证`);
}
function filterStatistics(period) {
  // 更新筛选按钮状态
  document.querySelectorAll('.stat-filter').forEach(filter => {
    filter.classList.remove('active');
  });
  event.target.classList.add('active');

  // 在实际应用中，这里会根据时间段更新统计数据
  alert(`筛选统计时间段: ${period}`);
}

function filterByDateRange(range) {
  if (range) {
    alert(`选择统计时间范围: ${range}`);
  }
}

function changeDataTable(tableType) {
  // 在实际应用中，这里会切换不同的数据表
  alert(`切换到 ${tableType} 数据表`);
}

function generateReport() {
  alert('PDF报告生成功能将在后续版本中实现');
}

function exportStatistics() {
  alert('Excel数据导出功能将在后续版本中实现');
}

function printStatistics() {
  alert('打印报表功能将在后续版本中实现');
}

function scheduleReport() {
  alert('定时报告功能将在后续版本中实现');
}
// 显示设置部分
function showSection(sectionId) {
  // 更新菜单状态
  document.querySelectorAll('.settings-menu a').forEach(link => {
    link.classList.remove('active');
  });
  event.target.classList.add('active');

  // 显示对应部分
  document.querySelectorAll('.settings-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId + '-section').classList.add('active');
}

// 用户管理功能
function addNewUser() {
  alert('添加新用户功能将在后续版本中实现');
}

function editUser(username) {
  alert(`编辑用户 ${username} 的信息`);
}

function deleteUser(username) {
  if (confirm(`确定要删除用户 ${username} 吗？`)) {
    alert(`用户 ${username} 已删除`);
  }
}

// 系统设置功能
function saveSystemSettings() {
  alert('系统设置已保存');
}

// 安全设置功能
function saveSecuritySettings() {
  alert('安全设置已保存');
}

function checkPasswordStrength(password) {
  const strengthMeter = document.getElementById('passwordStrength');
  strengthMeter.className = 'strength-meter';

  if (password.length === 0) {
    return;
  }

  let strength = 0;
  if (password.length >= 8) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[^A-Za-z0-9]/.test(password)) strength++;

  if (strength <= 1) {
    strengthMeter.classList.add('strength-weak');
  } else if (strength <= 3) {
    strengthMeter.classList.add('strength-medium');
  } else {
    strengthMeter.classList.add('strength-strong');
  }
}

function changePassword() {
  alert('密码修改成功，请重新登录');
}

// 数据备份功能
function manualBackup() {
  alert('手动备份功能将在后续版本中实现');
}

function restoreBackup() {
  alert('恢复备份功能将在后续版本中实现');
}

// 系统日志功能
function filterLogs(logType) {
  alert(`筛选日志类型: ${logType}`);
}

function exportLogs() {
  alert('导出日志功能将在后续版本中实现');
}

function clearLogs() {
  if (confirm('确定要清空所有系统日志吗？')) {
    alert('系统日志已清空');
  }
}

// 系统维护功能
function clearCache() {
  alert('缓存清理完成');
}

function optimizeDatabase() {
  alert('数据库优化完成');
}

function checkSystemHealth() {
  alert('系统健康检查完成，一切正常');
}

function systemUpdate() {
  alert('正在检查系统更新...当前已是最新版本');
}

function resetSystem() {
  if (confirm('警告：这将重置所有系统设置，确定要继续吗？')) {
    alert('系统重置功能将在后续版本中实现');
  }
}

function uninstallSystem() {
  if (confirm('警告：这将卸载整个系统，确定要继续吗？')) {
    alert('系统卸载功能将在后续版本中实现');
  }
}
function switchTab(tabName) {
  // 更新标签状态
  document.querySelectorAll('.repair-tab').forEach(tab => {
    tab.classList.remove('active');
    if (tab.getAttribute('data-tab') === tabName) {
      tab.classList.add('active');
    }
  });

  // 在实际应用中，这里会根据标签加载不同的报修列表
  alert(`切换到 ${tabName} 标签`);
}

function newRepair() {
  document.getElementById('newRepairForm').style.display = 'block';
}

function cancelRepair() {
  document.getElementById('newRepairForm').style.display = 'none';
}

function submitRepair() {
  alert('报修申请提交成功！');
  document.getElementById('newRepairForm').style.display = 'none';
}

function assignRepair() {
  alert('分配维修员功能将在后续版本中实现');
}

function exportRepairData() {
  alert('导出报修记录功能将在后续版本中实现');
}

function viewEmergency() {
  alert('查看紧急报修列表');
  switchTab('pending');
}

function processRepair(id) {
  alert(`开始处理报修 #${id}`);
}

function assignToRepairman(id) {
  alert(`为报修 #${id} 分配维修员`);
}

function cancelRepairItem(id) {
  if (confirm(`确定要取消报修 #${id} 吗？`)) {
    alert(`报修 #${id} 已取消`);
  }
}

function completeRepair(id) {
  alert(`报修 #${id} 已完成`);
}

function updateProgress(id) {
  alert(`更新报修 #${id} 的进度`);
}

function viewDetails(id) {
  alert(`查看报修 #${id} 的详细信息`);
}

function addComment(id) {
  const comment = prompt(`为报修 #${id} 添加备注：`);
  if (comment) {
    alert(`备注已添加: ${comment}`);
  }
}
function addNewBuilding() {
  alert('添加新楼栋功能将在后')
}
// 床位选择功能
document.querySelectorAll('.bed-item').forEach(bed => {
  bed.addEventListener('click', function () {
    document.querySelectorAll('.bed-item').forEach(b => b.classList.remove('selected'));
    this.classList.add('selected');

    const bedNumber = this.getAttribute('data-bed');
    updateBedInfo(bedNumber);
  });
});

// 筛选按钮功能
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');

    const filter = this.getAttribute('data-filter');
    filterBeds(filter);
  });
});

// 学生选择功能
document.querySelectorAll('input[name="studentSelect"]').forEach(radio => {
  radio.addEventListener('change', function () {
    if (this.checked) {
      const studentId = this.value;
      updateStudentInfo(studentId);
    }
  });
});

function updateBedInfo(bedNumber) {
  document.querySelector('.student-info-card:nth-child(2) p:nth-child(1) strong').parentNode.innerHTML =
    `<strong>位置：</strong>3号楼-${bedNumber}`;
}

function updateStudentInfo(studentId) {
  // 模拟获取学生信息
  const students = {
    '2024117878': { name: '杨帆', gender: '男', college: '计算机学院' },
    '2024145233': { name: '林雪', gender: '女', college: '人工智能与电子工程学院' },
    '2023778899': { name: '徐峰', gender: '男', college: '机械学院' }
  };

  const student = students[studentId];
  if (student) {
    document.querySelector('.student-info-card:first-child p:nth-child(1) strong').parentNode.innerHTML =
      `<strong>姓名：</strong>${student.name}`;
    document.querySelector('.student-info-card:first-child p:nth-child(2) strong').parentNode.innerHTML =
      `<strong>学号：</strong>${studentId}`;
    document.querySelector('.student-info-card:first-child p:nth-child(3) strong').parentNode.innerHTML =
      `<strong>性别：</strong>${student.gender}`;
    document.querySelector('.student-info-card:first-child p:nth-child(4) strong').parentNode.innerHTML =
      `<strong>学院：</strong>${student.college}`;
  }
}

function filterBeds(filter) {
  alert(`根据条件筛选床位: ${filter}`);
}

function filterByBuilding(building) {
  if (building) {
    alert(`筛选楼栋: ${building}号楼`);
  }
}
