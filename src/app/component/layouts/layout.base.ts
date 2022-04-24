import { IConfigService } from 'src/app/service/config.service';
import { Player } from 'src/app/models/player.model';

export class LayoutBase {
    private mainPlayerName: string;

    constructor(configService: IConfigService) {
        const config = configService.getConfiguration();
        this.mainPlayerName = config.mainPlayerName;

        configService.onConfigChanged.subscribe(conf => this.mainPlayerName = conf.mainPlayerName);
    }

    isMainPlayer(player: Player) {
        return player.name == this.mainPlayerName;
    }
}