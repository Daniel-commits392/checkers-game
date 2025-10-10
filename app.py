from flask import Flask, render_template, request, redirect, url_for, session

app=Flask(__name__)
app.secret_key = "shadow_secret_123"

@app.route('/')
def index():
    user_email = session.get('user_email', None)
    if not user_email:
        return render_template('login.html')
    
    return render_template('index.html',user_email=user_email)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        session['user_email'] = email  # store it in session
        return redirect(url_for('index'))
    return render_template('login.html')

@app.route('/logout')
def logout():
    session.pop('user_email', None)
    return redirect(url_for('login'))

if __name__=='__main__':
    app.run(debug=True)