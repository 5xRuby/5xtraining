import React from 'react';

export default function Contact() {
  return (
    <section>
      <div />
      <div className="container-fluid">
        <div className="row d-flex j-c-c">
          <div className="col-10">
            <div className="row">
              <div className="col-6">
                <div />
                <div />
                <div className="row">
                  <div className="col-6" />
                  <div className="col-6" />
                </div>
                <div />
              </div>
              <div className="col-6">
                <div>任何問題都歡迎您透過以下表單詢問，我們會盡快回覆您！</div>
                <form>
                  <div>
                    <input type="text" />
                  </div>
                  <div>
                    <input type="text" />
                  </div>
                  <div>
                    <input type="text" />
                  </div>
                  <div>
                    <input type="text" />
                  </div>
                  <div>
                    <input type="text" />
                  </div>
                  <div />
                  <button>送出</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
