const electronInstaller = require('electron-winstaller')
async function build(){
    try {
        await electronInstaller.createWindowsInstaller({
          appDirectory: __dirname,
          outputDirectory: 'build',
          authors: 'Chickendev',
          exe: 'app.exe'
        });
        console.log('It worked!');
    } catch (e) {
        console.log(`No dice: ${e.message}`);
    }
}
build()