import { Inject, Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { firstValueFrom, Observable } from 'rxjs';

import { FIELDS_DB, IFieldsDb } from '../../fieldsDb';
import { IUpdatePurch } from '../../interfaces/firestore-shop/i-update-purch';
import { IUpdateCart } from '../../interfaces/firestore-shop/i-update-cart';
import { IProfileV2 } from '../../interfaces/profileV2/i-profile-v2';

const COLLECTION = 'shop-users';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  private _fieldsDb!: IFieldsDb;
  constructor(
    private fs: AngularFirestore,
    @Inject(FIELDS_DB) fieldsDb: IFieldsDb
  ) {
    this._fieldsDb = fieldsDb;
  }

  private async checkFields(uid: string) {
    const db = this.fs.collection(COLLECTION).doc(uid).valueChanges();
    const firstValue = await firstValueFrom(db);

    if (!!!firstValue) {
      const emptyProfile: IProfileV2 = {
        cart: [],
        purchases: [],
      };
      await this.createUpdateDB(emptyProfile, uid);
    } else {
      let hasKeyCart = Object.prototype.hasOwnProperty.call(
        firstValue,
        this._fieldsDb.cart
      );
      let hasKeyPurchases = Object.prototype.hasOwnProperty.call(
        firstValue,
        this._fieldsDb.purchases
      );

      if (!hasKeyCart) {
        const emptyCart: IUpdateCart = {
          cart: [],
        };
        await this.createUpdateDB(emptyCart, uid);
      }

      if (!hasKeyPurchases) {
        const emptyPurchases: IUpdatePurch = {
          purchases: [],
        };
        await this.createUpdateDB(emptyPurchases, uid);
      }
    }
  }

  async getProfile(uid: string): Promise<Observable<any>> {
    await this.checkFields(uid);
    return this.fs.collection(COLLECTION).doc(uid).valueChanges();
  }

  async createUpdateDB(
    data: IUpdateCart | IUpdatePurch | IProfileV2,
    uid: string
  ) {
    const db = this.fs.collection(COLLECTION).doc(uid);
    try {
      await db.update(data);
    } catch (err) {
      await db.set(data);
    }
  }
}
