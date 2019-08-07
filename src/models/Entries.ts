import { Document, Model, model, Schema } from 'mongoose';

export interface IEntry {
  code: string;
  value: string;
}

export interface IEntryDocument extends IEntry, Document {}

export const entriesSchema = new Schema({
  code: { type: String },
  value: { type: String },
});

export interface IEntryModel extends Model<IEntryDocument> {
  sync(doc: IEntry): Promise<IEntryDocument>;
}

export const loadClass = () => {
  class Entry {
    public static async sync(doc: IEntry) {
      return Entries.create(doc);
    }
  }

  entriesSchema.loadClass(Entry);

  return entriesSchema;
};

loadClass();

// tslint:disable-next-line
const Entries = model<IEntryDocument, IEntryModel>('entries', entriesSchema);

export default Entries;