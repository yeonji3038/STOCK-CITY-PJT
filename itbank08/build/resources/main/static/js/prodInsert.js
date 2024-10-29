        // // 브랜드모달 열기
        // function openBrandModal() {
        //   document.getElementById('brandModal').style.display = 'block';
        // }
        // // 모달 닫기
        // function closeBrandModal() {
        //   document.getElementById('brandModal').style.display = 'none';
        // }

        // // 카테모달 열기
        // function openCateModal() {
        //   document.getElementById('cateModal').style.display = 'block';
        // }
        // // 모달 닫기
        // function closeCateModal() {
        //   document.getElementById('cateModal').style.display = 'none';
        // }
        // // 컬러모달 열기
        // function openColorModal() {
        //   document.getElementById('colorModal').style.display = 'block';
        // }

        // // 모달 닫기
        // function closeColorModal() {
        //   document.getElementById('colorModal').style.display = 'none';
        // }

        function openModal(modalName) {
            console.log('modalName : ', modalName)
            const selector = '#' + modalName
            console.log('selector : ', selector)
            const modalEle = document.querySelector(selector)
            modalEle.classList.add('open')
          }
  
          function closeModal(modalName) {
            const selector = '#' + modalName
            console.log('selector : ', selector)
            const modalEle = document.querySelector(selector)
            modalEle.classList.remove('open')
          }