const { unlinkSync, readFileSync, existsSync, rmSync } = require('fs');

const tracker = `${__dirname}/symbolic-link-tracker.txt`;
if (existsSync(tracker)) {
    console.log('Deleting current symbolic links');
    let values = readFileSync(tracker, 'utf-8').toString().split('\n');
    values.forEach(path => {
        const p = `${__dirname}/${path}`;
        try {
            if (path && existsSync(p)) {
                unlinkSync(path);
            }
        } catch {
            // Do nothing
        } finally {
            console.log(`Deleted symbolic link: ${path}`);
        }
    })
    // rmSync(tracker);
}