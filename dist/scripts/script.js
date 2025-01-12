const post_btn = document.querySelector('#post-btn');
const post_con = document.querySelector('#post-container');
const post_textarea = document.querySelector('#post-text');

activeGroup('.bg-changer-icon');

function validateText(textarea) {

    let value = textarea.value;

    if (value.length > 0) {

        post_btn.removeAttribute('disabled');
        post_btn.classList.remove('disabled');
        post_btn.classList.add('btn-primary');

        let lines = value.split(/\r?\n|\s{2,}/).filter(Boolean);
        let rows = Math.min(Math.max(lines.length, 3), 13);
        console.log("rows", lines.length);
        textarea.rows = rows;

        if (value.length > 100) {
            textarea.style.fontSize = '1rem';
        } else {
            textarea.style.fontSize = '1.5rem';
        }

    } else {
        post_btn.setAttribute('disabled', true);
        post_btn.classList.remove('btn-primary');
        post_btn.classList.add('disabled');
    }

}

function createPostFrom(from) {

    let formData = new FormData(from);

    let data = {};
    for (const [key, value] of formData.entries()) {
        data[key] = value;
    }

    let new_post = renderPost(data);

    post_con.insertAdjacentHTML('beforeend', new_post);
    post_textarea.value = '';
    toggle('#create-post');

    return false;

}

function renderPost(data) {
    return `
    <div class="post bg-white rounded-lg shadow py-3 px-4">
        <div class="flex gap-2 mb-3">
          <img class="rounded-full" src="./images/user-logo.png" alt="" height="38">
          <div class="small">
            <div class="mb-1"><a href="" class="link1 font-bold">Rejwan Islam Rizvy</a></div>
            <span class="text-slate-400 flex items-center gap-1">
              <button class="link1">Just Now</button>
              <span>-</span>
              <span title="Public">
                <i class="fas fa-earth-americas"></i>
              </span>
            </span>
          </div>
          <div class="flex gap-1 ms-auto">
            <button class="btn circle">
              <i class="fas fa-ellipsis"></i>
            </button>
            <button class="btn circle">
              <i class="fa fa-times"></i>
            </button>
          </div>
        </div>
        <div class="${data.text.length < 100 ? 'text-2xl' : ''}">
          ${data.text}
        </div>
        <div class="w-full mt-3 mb-1 border-td py-2 flex gap-1 items-center small">
          <img src="./images/like-icon-colored.png" alt="" style="height: 1.2rem;">
          <div>
            <button class="link1">0</button>
          </div>
          <div class="ms-auto">
            <button class="link1">0 Comment</button>
          </div>
        </div>
        <div class="flex gap-1 small font-bold text-gray-500">
          <button class="btn flex-1">
            <img src="./images/like-icon-grayed.png" alt="" style="height: 1.5rem;">
            Like
          </button>
          <button class="btn flex-1">
            <img src="./images/comment-icon.png" alt="" style="height: 1.5rem;">
            Comment
          </button>
          <button class="btn flex-1">
            <img src="./images/share-icon.png" alt="" style="height: 1.5rem;">
            Share
          </button>
        </div>
      </div>
    `;
}

function toggle(...selectors) {
    for (const selector of selectors) {
        document.querySelector(selector).classList.toggle('hidden');
    }
}

function activeGroup(selector) {

    let elements = document.querySelectorAll(selector);
    elements.forEach(elem => {
        elem.addEventListener('click', () => {
            elements.forEach(el => el.classList.remove('active'));
            elem.classList.add('active');
        });
    });

}