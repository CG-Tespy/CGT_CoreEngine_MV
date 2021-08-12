import { HitType } from "./HitType";

export class InvocationSettings
{
    get Speed(): number { return this.speed; }
    private speed: number = 0;

    get SuccessRate(): number { return this.successRate; }
    private successRate: number = 0;

    get Repeats(): number { return this.repeats; }
    private repeats: number = 0;

    get TPGain(): number { return this.tpGain; }
    private tpGain: number = 0;

    get HitType(): HitType { return this.hitType; }
    private hitType: HitType = HitType.Null;

    get AnimationID(): number { return this.animationID; }
    private animationID: number = -1;

    static FromBaseItem(baseItem: RPG.Item): InvocationSettings
    {
        let newSettings = new this();
        newSettings.SetFromBaseItem(baseItem);
        return newSettings;
    }

    SetFromBaseItem(baseItem: RPG.Item): void
    {
        this.speed = baseItem.speed;
        this.successRate = baseItem.successRate;
        this.repeats = baseItem.repeats;

        this.tpGain = baseItem.tpGain;
        this.hitType = baseItem.hitType;
        this.animationID = baseItem.animationId;
    }
}