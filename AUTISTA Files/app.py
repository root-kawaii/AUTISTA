from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/hello')
def hello():
    return render_template('hello.html')


#debug mode, serve per poter visualizzare la pagina aggiornata semplicemente
# aggiornando, altrimenti servirebbe riavviare il server ogni volta
if __name__ == '__main__':
    app.run(debug=True)
