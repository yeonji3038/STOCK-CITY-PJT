// 카테고리 폼 유효성 검사 함수
function validateCategoryForm() {
    // 이전 오류 표시 제거
    resetCategoryBorders();

    // 필수 필드 검사
    var categoryName = document.getElementById('cateName').value.trim();
    var categoryDescription = document.getElementById('categoryDescription').value.trim();

    if (categoryName === "") {
        markAsCategoryError('cateName');
        return false;
    }

    // 추가적인 유효성 검사 규칙을 여기에 추가할 수 있습니다.

    // 폼이 유효하면 제출
    return true;
}

// Size 폼 유효성 검사 함수
function validateSizeForm() {
    // 이전 오류 표시 제거
    resetSizeBorders();

    // 필수 필드 검사
    var sizeName = document.getElementById('sizeName').value.trim();
    var sizeDescription = document.getElementById('sizeDescription').value.trim();

    if (sizeName === "") {
        markAsSizeError('sizeName');
        return false;
    }

    // 추가적인 유효성 검사 규칙을 여기에 추가할 수 있습니다.

    // 폼이 유효하면 제출
    return true;
}

// Color 폼 유효성 검사 함수
function validateColorForm() {
    // 이전 오류 표시 제거
    resetColorBorders();

    // 필수 필드 검사
    var colorName = document.getElementById('colorName').value.trim();

    if (colorName === "") {
        markAsColorError('colorName');
        return false;
    }

    // 추가적인 유효성 검사 규칙을 여기에 추가할 수 있습니다.

    // 폼이 유효하면 제출
    return true;
}

// Category 오류 표시 제거 함수
function resetCategoryBorders() {
    var inputs = document.getElementById('categoryForm').getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove('error');
    }

    var textarea = document.getElementById('categoryDescription');
    textarea.classList.remove('error');
}

// Category 오류 표시 함수
function markAsCategoryError(elementId) {
    document.getElementById(elementId).classList.add('error');
}

// Size 오류 표시 제거 함수
function resetSizeBorders() {
    var inputs = document.getElementById('sizeForm').getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove('error');
    }

    var textarea = document.getElementById('sizeDescription');
    textarea.classList.remove('error');
}

// Size 오류 표시 함수
function markAsSizeError(elementId) {
    document.getElementById(elementId).classList.add('error');
}

// Color 오류 표시 제거 함수
function resetColorBorders() {
    var inputs = document.getElementById('colorForm').getElementsByTagName('input');
    for (var i = 0; i < inputs.length; i++) {
        inputs[i].classList.remove('error');
    }
}

// Color 오류 표시 함수
function markAsColorError(elementId) {
    document.getElementById(elementId).classList.add('error');
}