import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';

function currency(n) {
  if (Number.isNaN(n) || n === null) return '0.00';
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD' });
}

export default function SplitCalculator() {
  const [people, setPeople] = useState([
    { id: 1, name: 'You', paid: 0, share: 1 },
    { id: 2, name: 'Alex', paid: 0, share: 1 },
  ]);
  const [total, setTotal] = useState(0);

  const sharesSum = useMemo(() => people.reduce((s, p) => s + (Number(p.share) || 0), 0), [people]);
  const perUnit = sharesSum > 0 ? total / sharesSum : 0;

  const balances = useMemo(() => {
    return people.map(p => {
      const owed = (Number(p.share) || 0) * perUnit;
      const paid = Number(p.paid) || 0;
      return { ...p, balance: paid - owed };
    });
  }, [people, perUnit]);

  const creditors = balances.filter(b => b.balance > 0).sort((a,b) => b.balance - a.balance);
  const debtors = balances.filter(b => b.balance < 0).sort((a,b) => a.balance - b.balance);

  const settlements = useMemo(() => {
    const pays = [];
    let i = 0, j = 0;
    const cred = creditors.map(c => ({ ...c }));
    const debt = debtors.map(d => ({ ...d }));
    while (i < debt.length && j < cred.length) {
      const owe = -debt[i].balance;
      const have = cred[j].balance;
      const pay = Math.min(owe, have);
      if (pay > 0.0001) {
        pays.push({ from: debt[i].name, to: cred[j].name, amount: pay });
        debt[i].balance += pay;
        cred[j].balance -= pay;
      }
      if (Math.abs(debt[i].balance) < 0.0001) i++;
      if (Math.abs(cred[j].balance) < 0.0001) j++;
    }
    return pays;
  }, [creditors, debtors]);

  const updatePerson = (id, key, value) => {
    setPeople(prev => prev.map(p => (p.id === id ? { ...p, [key]: value } : p)));
  };

  const addPerson = () => {
    const nextId = (people.at(-1)?.id || 0) + 1;
    setPeople(prev => [...prev, { id: nextId, name: `Person ${nextId}`, paid: 0, share: 1 }]);
  };

  const removePerson = (id) => {
    if (people.length <= 2) return;
    setPeople(prev => prev.filter(p => p.id !== id));
  };

  return (
    <section id="split" className="mx-auto max-w-6xl px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="grid gap-8 md:grid-cols-2"
      >
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          <h2 className="text-xl font-semibold text-white">Transaction</h2>
          <p className="mt-1 text-sm text-white/70">Enter total and who paid what. Use weights to split unevenly.</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="col-span-2 text-sm text-white/80">Total amount</label>
            <input
              type="number"
              className="col-span-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-white placeholder-white/50 outline-none focus:ring-2 focus:ring-white/30"
              placeholder="0.00"
              value={total}
              onChange={(e) => setTotal(Number(e.target.value))}
              min="0"
              step="0.01"
            />
          </div>

          <div className="mt-6 space-y-3">
            {people.map((p) => (
              <div key={p.id} className="grid grid-cols-12 items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                <input
                  className="col-span-4 rounded-md border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-white/30"
                  value={p.name}
                  onChange={(e) => updatePerson(p.id, 'name', e.target.value)}
                />
                <input
                  type="number"
                  className="col-span-3 rounded-md border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-white/30"
                  value={p.paid}
                  min="0"
                  step="0.01"
                  onChange={(e) => updatePerson(p.id, 'paid', Number(e.target.value))}
                />
                <input
                  type="number"
                  className="col-span-3 rounded-md border border-white/10 bg-black/30 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-white/30"
                  value={p.share}
                  min="0"
                  step="0.5"
                  onChange={(e) => updatePerson(p.id, 'share', Number(e.target.value))}
                />
                <button
                  onClick={() => removePerson(p.id)}
                  className="col-span-2 rounded-md bg-white/10 px-3 py-2 text-sm font-medium text-white/90 hover:bg-white/20"
                >
                  Remove
                </button>
              </div>
            ))}

            <button onClick={addPerson} className="mt-2 w-full rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 hover:opacity-90">
              Add person
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm" id="summary">
          <h2 className="text-xl font-semibold text-white">Summary</h2>
          <p className="mt-1 text-sm text-white/70">Weighted split based on shares. Positive = gets paid. Negative = owes.</p>

          <div className="mt-4 grid grid-cols-1 gap-3">
            {balances.map(b => (
              <div key={b.id} className="flex items-center justify-between rounded-lg bg-black/30 p-3">
                <div className="text-white/90">{b.name}</div>
                <div className={"font-mono text-sm " + (b.balance >= 0 ? 'text-emerald-400' : 'text-rose-400')}>
                  {b.balance >= 0 ? '+' : ''}{currency(b.balance)}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-white/80">Suggested settlements</h3>
            <div className="mt-2 space-y-2">
              {settlements.length === 0 && (
                <p className="text-sm text-white/60">You're all settled up.</p>
              )}
              {settlements.map((s, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/10 p-3"
                >
                  <span className="text-white/90">{s.from} → {s.to}</span>
                  <span className="font-mono text-sm text-white">{currency(s.amount)}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
