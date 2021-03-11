export abstract class Command {
    public constructor() {
        console.log('Command started');
    };

    public abstract run();
}