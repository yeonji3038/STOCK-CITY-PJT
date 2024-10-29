function openModal(modalName, prodNo) {
    console.log('prodNo: ', prodNo);
    loadProdInfo(prodNo)
    const selector = '#' + modalName
    const modalEle = document.querySelector(selector)
    modalEle.classList.add('open')
  }

  function closeModal(modalName) {
    const selector = '#' + modalName
    const modalEle = document.querySelector(selector)
    modalEle.classList.remove('open')
  }

  const modalForm = document.querySelector('#modalForm')
  modalForm.addEventListener('submit', function (event) {
    event.preventDefault()
    console.log('event: ', event);

    const formData = new FormData(modalForm)
    const formNameList = ['prodNo', 'brandCode', 'cateCode', 'size', 'colorCode', 'incomePrice', 'sellPrice', 'prodCon']

    // const someObj = { a: 1, b: 2 }
    // someObj.a // 1
    // someObj['a'] // 1

    // someObj.a = 3
    // someObj['a'] = 3

    const submitData = {}

    for (let i = 0; i < formNameList.length; i++) {
      const formName = formNameList[i]
      if (['incomePrice', 'sellPrice'].includes(formName)) {
        submitData[formName] = parseInt(formData.get(formName))
      } else {
        submitData[formName] = formData.get(formName)
      }
    }
    console.log('submitData: ', submitData);
    updateFetch(submitData)

    if (true) {
      alert('수정 완료')
      closeModal('productModal')
    } else {
      alert('수정 실패')
    }

  })

  function updateFetch(submitData) {
    fetch(
      'http://localhost/prod/updateProd/' + submitData.prodNo,
      {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(submitData)
      })
      .then(res => res.json())  // 응답데이터를 json으로 변경
      .then(data => {           // json으로 변환된 data를 받아옴
        console.log('data: ', data);
        return data
      })

  }

  // fetch로 데이터 받아오기(비동기): fetch('url') -> get으로 동작
  // 만약 post로 하려면 옵션 넣어줘야해
  // fetch('url', {
  // method: 'POST'
  // body: JSON.stringify(data) (데이터를 객체로 만들어서 타입 String으로 변경)
  // })
  function loadProdInfo(prodNo) {
    fetch('http://localhost/prod/detail/' + prodNo)
      .then(res => res.json())  // 응답데이터를 json으로 변경
      .then(data => {           // json으로 변환된 data를 받아옴
        console.log('data: ', data);
        generateModalContent(data)
      })
  }

  function generateModalContent(prodInfo) {
    const formHtml =
      '<div class="form-container">'
      + '  <h2 style="text-align: center;">' + prodInfo.prodName + '</h2>'
      + '  <div class="input-row">'
      + '    <label for="modifyProdNo">상품코드</label>'
      + '    <input type="text" class="modifyProdNo" name="prodNo" value="' + prodInfo.prodNo + '" readonly>'
      + '  </div>'
      + '  <div class="input-row">'
      + '    <label for="modifyBrandCode">브랜드코드</label>'
      + '    <input type="text" class="modifyBrandCode" name="brandCode" value="' + prodInfo.brandCode + '" readonly>'
      + '  </div>'
      + '  <div class="input-row">'
      + '    <label for="modifyCate">카테고리</label>'
      + '    <input type="text" class="modifyCate" name="cateCode" value="' + prodInfo.cateCode + '" readonly>'
      + '  </div>'
      + '  <div class="input-row">'
      + '    <label for="modifySize">사이즈</label>'
      + '    <input type="text" class="modifySize" name="size" value="' + prodInfo.size + '" readonly>'
      + '  </div>'
      + '  <div class="input-row">'
      + '    <label for="modifyColor">색상</label>'
      + '    <input type="text" class="modifyColor" name="color" value="' + prodInfo.colorCode + '" readonly>'
      + '  </div>'
      + '  <div class="input-row">'
      + '    <label for="modifyIncomePrice">입고금액</label>'
      + '    <input type="text" class="modifyIncomePrice" name="incomePrice" value="' + prodInfo.incomePrice + '">'
      + '  </div>'
      + '  <div class="input-row">'
      + '    <label for="modifySellPrice">판매금액</label>'
      + '    <input type="text" class="modifySellPrice" name="sellPrice" value="' + prodInfo.sellPrice + '">'
      + '  </div>'
      + '  <div class="input-row">'
      + '    <label for="modifyProdCon">상품설명</label>'
      + '    <input type="text" class="modifyProdCon" name="prodCon" value="' + prodInfo.prodCon + '">'
      + '  </div>'
      + '  <input type="submit" class="form-container button" value="수정"></input>'
      + '  <button type="button" class="form-container button" onclick="closeModal(`productModal`)">취소</button>'
      + '</div>'

    console.log('formHtml: ', formHtml);
    const modal = document.querySelector('#modalForm')
    modal.innerHTML = formHtml


  }
  loadProdInfo()