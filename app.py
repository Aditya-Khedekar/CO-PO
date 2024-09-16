from flask import Flask, render_template, request, redirect, url_for
from flask_mysqldb import MySQL
import pandas as pd

from openpyxl import load_workbook

app = Flask(__name__)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = '123456'
app.config['MYSQL_DB'] = 'flaskapp'

mysql = MySQL(app)


@app.route('/', methods=['GET', 'POST'])
def marks():
    if request.method == 'POST':
        
        num_rows = int(request.form['rowCount'])
        sub = request.form['input1']

        


        cur = mysql.connection.cursor()

        cur.execute(f'''CREATE TABLE IF NOT EXISTS {sub} (
            id VARCHAR(9) ,
            name VARCHAR(255),
            aa VARCHAR(5),
            ab VARCHAR(5),
            ac VARCHAR(5),
            ad VARCHAR(5),
            ae VARCHAR(5),
            af VARCHAR(5),
            ba VARCHAR(5),
            bb VARCHAR(5),
            ca VARCHAR(5),
            cb VARCHAR(5),
            baa VARCHAR(5),
            bab VARCHAR(5),
            bac VARCHAR(5),
            bad VARCHAR(5),
            bae VARCHAR(5),
            baf VARCHAR(5),
            bba VARCHAR(5),
            bbb VARCHAR(5),
            bca VARCHAR(5),
            bcb VARCHAR(5)
        )''')

        for i in range(1, num_rows + 1):
             
            id = request.form[f'id_{i}']
            name = request.form[f'name_{i}']
            aa = request.form[f'aa_{i}']
            ab = request.form[f'ab_{i}']
            ac = request.form[f'ac_{i}']
            ad = request.form[f'ad_{i}']
            ae = request.form[f'ae_{i}']
            af = request.form[f'af_{i}']
            ba = request.form[f'ba_{i}']
            bb = request.form[f'bb_{i}']
            ca = request.form[f'ca_{i}']
            cb = request.form[f'cb_{i}']

            baa = request.form[f'baa_{i}']
            bab = request.form[f'bab_{i}']
            bac = request.form[f'bac_{i}']
            bad = request.form[f'bad_{i}']
            bae = request.form[f'bae_{i}']
            baf = request.form[f'baf_{i}']
            bba = request.form[f'bba_{i}']
            bbb = request.form[f'bbb_{i}']
            bca = request.form[f'bca_{i}']
            bcb = request.form[f'bcb_{i}']

            

            cur.execute("INSERT INTO {} (id, name, aa, ab, ac, ad, ae, af, ba, bb, ca, cb, baa, bab, bac, bad, bae, baf, bba, bbb, bca, bcb) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)".format(sub),
                        (id, name, aa, ab, ac, ad, ae, af, ba, bb, ca, cb, baa, bab, bac, bad, bae, baf, bba, bbb, bca, bcb))
            
        cur.execute(f'''CREATE TABLE IF NOT EXISTS {sub}_co (co1 varchar(20) )''')
        
        for j in range(1, 7):
            co1 = request.form[f'co_{j}']
            cur.execute("INSERT INTO {}_co (co1) VALUES (%s)".format(sub), (co1,))

        
        cur.execute(f'''CREATE TABLE IF NOT EXISTS {sub}_CO_MATRIX (ps1 VARCHAR(5), ps2 VARCHAR(5), ps3 VARCHAR(5), ps4 VARCHAR(5), ps5 VARCHAR(5),
                                                                    ps6 VARCHAR(5), ps7 VARCHAR(5), ps8 VARCHAR(5), ps9 VARCHAR(5), ps10 VARCHAR(5),
                                                                    ps11 VARCHAR(5), ps12 VARCHAR(5), pso1 VARCHAR(5), pso2 VARCHAR(5))''')
        l = 2
        for k in range(1,7):
            
            ps1 = request.form[f'po_{k}_{l}']
            ps2 = request.form[f'po_{k}_{l+1}']  
            ps3 = request.form[f'po_{k}_{l+2}']
            ps4 = request.form[f'po_{k}_{l+3}']
            ps5 = request.form[f'po_{k}_{l+4}']
            ps6 = request.form[f'po_{k}_{l+5}']
            ps7 = request.form[f'po_{k}_{l+6}']
            ps8 = request.form[f'po_{k}_{l+7}']
            ps9 = request.form[f'po_{k}_{l+8}']
            ps10 = request.form[f'po_{k}_{l+9}']
            ps11 = request.form[f'po_{k}_{l+10}']
            ps12 = request.form[f'po_{k}_{l+11}']
            pso1 = request.form[f'po_{k}_{l+12}']
            pso2 = request.form[f'po_{k}_{l+13}']
            # l=l+1

            cur.execute("INSERT INTO {}_CO_MATRIX (ps1, ps2, ps3, ps4, ps5, ps6, ps7, ps8, ps9, ps10, ps11,ps12, pso1, pso2) VALUES (%s, %s,%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)".format(sub),
                            (ps1, ps2, ps3, ps4, ps5, ps6, ps7, ps8, ps9, ps10,ps11,ps12, pso1, pso2))


        mysql.connection.commit()
        cur.close()

        return redirect(url_for('index'))

    return render_template('index.html')


# @app.route('/', methods=['POST'])
# def outcomes():
#     if request.method == 'POST':
    
#         cur = mysql.connection.cursor()
#         cur.execute(f'''CREATE TABLE IF NOT EXISTS abc (
#           co1 varchar(20) )
#         )''')
#         # cur.execute(f"CREATE TABLE IF NOT EXISTS abc()")
#         for j in range(0, 6):
#             co1 = request.form[f'co_{j}']
#             cur.execute("INSERT INTO abc(co1) VALUES(%s)", (co1,))
#     mysql.connection.commit()
#     cur.close()
#     return redirect(url_for('index'))


@app.route('/')
def index():
    return render_template('index.html')


if __name__ == '__main__':
    app.run(debug=True)
