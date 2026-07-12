let subjects = [];
let editingIndex = -1;

function toggleMode() {
    const mode = document.querySelector('input[name="calcMode"]:checked').value;
    const creditsGroup = document.getElementById('creditsGroup');
    const tableWrapper = document.getElementById('tableWrapper');
    const summaryTotalCreditsItem = document.getElementById('summaryTotalCreditsItem');
    const addBtnGroup = document.getElementById('addBtnGroup');
    
    if (mode === 'single') {
        creditsGroup.style.display = 'none';
        tableWrapper.style.display = 'none';
        summaryTotalCreditsItem.style.display = 'none';
        addBtnGroup.style.display = 'none';
    } else {
        creditsGroup.style.display = 'flex';
        tableWrapper.style.display = 'block';
        summaryTotalCreditsItem.style.display = 'block';
        addBtnGroup.style.display = 'block';
        editingIndex = -1;
        const btn = document.getElementById('addBtn');
        btn.textContent = '➕ Thêm môn';
        btn.classList.add('btn-add');
        btn.classList.remove('btn-update');
    }
    updateSummary();
}

function updatePreviews() {
    const cc = parseFloat(document.getElementById('cc').value) || 0;
    const gk = parseFloat(document.getElementById('gk').value) || 0;
    const kt = parseFloat(document.getElementById('kt').value) || 0;
    
    const m1 = cc * 0.1 + gk * 0.3 + kt * 0.6;
    const m2 = cc * 0.2 + gk * 0.3 + kt * 0.5;
    const m3 = cc * 0.1 + gk * 0.2 + kt * 0.7;

    document.getElementById('previewMethod1').textContent = m1.toFixed(2);
    document.getElementById('previewMethod2').textContent = m2.toFixed(2);
    document.getElementById('previewMethod3').textContent = m3.toFixed(2);
}

function calculateScore(cc, gk, kt) {
    const method = document.querySelector('input[name="calcMethod"]:checked').value;
    if (method === '1') return cc * 0.1 + gk * 0.3 + kt * 0.6;
    if (method === '2') return cc * 0.2 + gk * 0.3 + kt * 0.5;
    if (method === '3') return cc * 0.1 + gk * 0.2 + kt * 0.7;
    return 0;
}

function handleAddOrUpdate() {
    if (editingIndex > -1) {
        updateSubject(editingIndex);
    } else {
        addSubject();
    }
}

function resetForm() {
    document.getElementById('subjectName').value = '';
    document.getElementById('cc').value = '';
    document.getElementById('gk').value = '';
    document.getElementById('kt').value = '';
    document.getElementById('credits').value = '';
    updatePreviews();

    editingIndex = -1;
    const btn = document.getElementById('addBtn');
    btn.textContent = '➕ Thêm môn';
    btn.classList.add('btn-add');
    btn.classList.remove('btn-update');
}

function calculateSingleSubject() {
    const mode = document.querySelector('input[name="calcMode"]:checked').value;
    if (mode === 'semester') {
        handleAddOrUpdate();
        return;
    }

    const cc = parseFloat(document.getElementById('cc').value);
    const gk = parseFloat(document.getElementById('gk').value);
    const kt = parseFloat(document.getElementById('kt').value);

    if (isNaN(cc) || isNaN(gk) || isNaN(kt)) {
        alert('Vui lòng nhập đầy đủ điểm!');
        return;
    }

    if (cc < 0 || cc > 10 || gk < 0 || gk > 10 || kt < 0 || kt > 10) {
        alert('Điểm phải trong khoảng 0-10!');
        return;
    }

    const grade10 = calculateScore(cc, gk, kt);
    
    document.getElementById('totalSubjects').textContent = '1 (Đơn)';
    document.getElementById('totalCredits').textContent = '---';
    document.getElementById('avgGrade10').textContent = grade10.toFixed(2);
    document.getElementById('avgGrade4').textContent = getGrade4(grade10).toFixed(2);
    document.getElementById('overallRank').textContent = getRank(grade10);
}

function getLetterGrade(grade10) {
    if (grade10 >= 8.5) return 'A';
    if (grade10 >= 8.0) return 'B+';
    if (grade10 >= 7.0) return 'B';
    if (grade10 >= 6.5) return 'C+';
    if (grade10 >= 5.5) return 'C';
    if (grade10 >= 5.0) return 'D+';
    if (grade10 >= 4.0) return 'D';
    return 'F';
}

function getGrade4(grade10) {
    if (grade10 >= 8.5) return 4.0;
    if (grade10 >= 8.0) return 3.5;
    if (grade10 >= 7.0) return 3.0;
    if (grade10 >= 6.5) return 2.5;
    if (grade10 >= 5.5) return 2.0;
    if (grade10 >= 5.0) return 1.5;
    if (grade10 >= 4.0) return 1.0;
    return 0;
}

function getRank(grade10) {
    if (grade10 >= 9.0) return 'Xuất sắc';
    if (grade10 >= 8.5) return 'Giỏi';
    if (grade10 >= 8.0) return 'Khá giỏi';
    if (grade10 >= 7.0) return 'Khá';
    if (grade10 >= 6.5) return 'Trung bình khá';
    if (grade10 >= 5.5) return 'Trung bình';
    if (grade10 >= 5.0) return 'Trung bình yếu';
    if (grade10 >= 4.0) return 'Yếu';
    return 'Kém (Không đạt)';
}

function getGradeClass(letter) {
    if (letter === 'A' || letter === 'B+') return 'grade-a';
    if (letter === 'B' || letter === 'C+') return 'grade-b';
    if (letter === 'C' || letter === 'D+') return 'grade-c';
    if (letter === 'D') return 'grade-d';
    return 'grade-f';
}

function addSubject() {
    const name = document.getElementById('subjectName').value.trim();
    const cc = parseFloat(document.getElementById('cc').value);
    const gk = parseFloat(document.getElementById('gk').value);
    const kt = parseFloat(document.getElementById('kt').value);
    const credits = parseInt(document.getElementById('credits').value) || 1;

    if (!name || isNaN(cc) || isNaN(gk) || isNaN(kt)) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }

    if (cc < 0 || cc > 10 || gk < 0 || gk > 10 || kt < 0 || kt > 10) {
        alert('Điểm phải trong khoảng 0-10!');
        return;
    }

    if (isNaN(credits) || credits < 1) {
        alert('Số tín chỉ phải là số nguyên dương!');
        return;
    }

    const grade10 = calculateScore(cc, gk, kt);
    const letterGrade = getLetterGrade(grade10);
    const grade4 = getGrade4(grade10);
    const rank = getRank(grade10);

    subjects.push({
        name,
        cc,
        gk,
        kt,
        credits,
        grade10,
        letterGrade,
        grade4,
        rank
    });

    document.getElementById('subjectName').value = '';
    document.getElementById('cc').value = '';
    document.getElementById('gk').value = '';
    document.getElementById('kt').value = '';
    document.getElementById('credits').value = '';
    updatePreviews();

    renderTable();
    updateSummary();
}

function deleteSubject(index) {
    subjects.splice(index, 1);
    renderTable();
    updateSummary();
}

function editSubject(index) {
    editingIndex = index;
    const subject = subjects[index];

    document.getElementById('subjectName').value = subject.name;
    document.getElementById('cc').value = subject.cc;
    document.getElementById('gk').value = subject.gk;
    document.getElementById('kt').value = subject.kt;
    document.getElementById('credits').value = subject.credits;
    
    updatePreviews();

    const btn = document.getElementById('addBtn');
    btn.textContent = '✏️ Cập nhật';
    btn.classList.remove('btn-add');
    btn.classList.add('btn-update');
}

function updateSubject(index) {
    const name = document.getElementById('subjectName').value.trim();
    const cc = parseFloat(document.getElementById('cc').value);
    const gk = parseFloat(document.getElementById('gk').value);
    const kt = parseFloat(document.getElementById('kt').value);
    const credits = parseInt(document.getElementById('credits').value) || 1;

    if (!name || isNaN(cc) || isNaN(gk) || isNaN(kt)) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }

    if (cc < 0 || cc > 10 || gk < 0 || gk > 10 || kt < 0 || kt > 10) {
        alert('Điểm phải trong khoảng 0-10!');
        return;
    }

    if (isNaN(credits) || credits < 1) {
        alert('Số tín chỉ phải là số nguyên dương!');
        return;
    }

    const grade10 = calculateScore(cc, gk, kt);
    const letterGrade = getLetterGrade(grade10);
    const grade4 = getGrade4(grade10);
    const rank = getRank(grade10);

    subjects[index] = {
        name,
        cc,
        gk,
        kt,
        credits,
        grade10,
        letterGrade,
        grade4,
        rank
    };

    document.getElementById('subjectName').value = '';
    document.getElementById('cc').value = '';
    document.getElementById('gk').value = '';
    document.getElementById('kt').value = '';
    document.getElementById('credits').value = '';
    updatePreviews();

    editingIndex = -1;
    const btn = document.getElementById('addBtn');
    btn.textContent = '➕ Thêm môn';
    btn.classList.add('btn-add');
    btn.classList.remove('btn-update');

    renderTable();
    updateSummary();
}

function renderTable() {
    const tbody = document.getElementById('gradeTable');

    if (subjects.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="11" style="text-align: center; color: #999; padding: 30px;">
                    Chưa có môn học nào. Hãy thêm môn học mới!
                </td>
            </tr>
        `;
        return;
    }

    tbody.innerHTML = subjects.map((sub, index) => `
        <tr>
            <td>${index + 1}</td>
            <td style="text-align: left; font-weight: 600;">${sub.name}</td>
            <td>${sub.credits}</td>
            <td>${sub.cc.toFixed(1)}</td>
            <td>${sub.gk.toFixed(1)}</td>
            <td>${sub.kt.toFixed(1)}</td>
            <td><strong>${sub.grade10.toFixed(2)}</strong></td>
            <td class="${getGradeClass(sub.letterGrade)}">${sub.letterGrade}</td>
            <td>${sub.grade4.toFixed(1)}</td>
            <td>${sub.rank}</td>
            <td>
                <button type="button" class="btn btn-update" onclick="editSubject(${index})">✏️ Sửa</button>
                <button type="button" class="btn btn-delete" onclick="deleteSubject(${index})">🗑️ Xoá</button>
            </td>
        </tr>
    `).join('');
}

function updateSummary() {
    const mode = document.querySelector('input[name="calcMode"]:checked').value;
    if (mode === 'single') return;
    
    const total = subjects.length;
    document.getElementById('totalSubjects').textContent = total;

    if (total === 0) {
        document.getElementById('totalCredits').textContent = '0';
        document.getElementById('avgGrade10').textContent = '0.00';
        document.getElementById('avgGrade4').textContent = '0.00';
        document.getElementById('overallRank').textContent = '---';
        return;
    }

    let totalCredits = 0;
    let weightedSum10 = 0;
    let weightedSum4 = 0;

    subjects.forEach(sub => {
        totalCredits += sub.credits;
        weightedSum10 += sub.grade10 * sub.credits;
        weightedSum4 += sub.grade4 * sub.credits;
    });

    const weightedAvg10 = totalCredits > 0 ? weightedSum10 / totalCredits : 0;
    const weightedAvg4 = totalCredits > 0 ? weightedSum4 / totalCredits : 0;

    document.getElementById('totalCredits').textContent = totalCredits;
    document.getElementById('avgGrade10').textContent = weightedAvg10.toFixed(2);
    document.getElementById('avgGrade4').textContent = weightedAvg4.toFixed(2);
    document.getElementById('overallRank').textContent = getRank(weightedAvg10);
}

function handleEnter(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const mode = document.querySelector('input[name="calcMode"]:checked').value;
        if (mode === 'single') {
            calculateSingleSubject();
        } else {
            handleAddOrUpdate();
        }
    }
}

document.getElementById('subjectName').addEventListener('keypress', handleEnter);
document.getElementById('cc').addEventListener('keypress', handleEnter);
document.getElementById('gk').addEventListener('keypress', handleEnter);
document.getElementById('kt').addEventListener('keypress', handleEnter);
