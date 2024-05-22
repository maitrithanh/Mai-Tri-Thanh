interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: Blockchain; // add blockchain property.
}

// interface FormattedWalletBalance {
//   currency: string;
//   amount: number;
//   formatted: string;
// }

interface FormattedWalletBalance extends WalletBalance {
  formatted: string; // just add formatted property and extends property from WalletBalance.
}

// use enum to clearly define valid values ​​for the blockchain and easily find errors if there are any.
enum Blockchain {
  Osmosis = "Osmosis",
  Ethereum = "Ethereum",
  Arbitrum = "Arbitrum",
  Zilliqa = "Zilliqa",
  Neo = "Neo",
}

// interface Props extends BoxProps {}
// use BoxProps because Props not have property when extends.
const WalletPage: React.FC<BoxProps> = (props: BoxProps) => {
  const { children, ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  // const getPriority = (blockchain: any): number => {
  //   switch (blockchain) {
  //     case "Osmosis":
  //       return 100;
  //     case "Ethereum":
  //       return 50;
  //     case "Arbitrum":
  //       return 30;
  //     case "Zilliqa":
  //       return 20;
  //     case "Neo":
  //       return 20;
  //     default:
  //       return -99;
  //   }
  // };

  //using type any for blockchain will not take full advantage of Typescript.
  const getPriority = (blockchain: Blockchain): number => {
    switch (blockchain) {
      case Blockchain.Osmosis:
        return 100;
      case Blockchain.Ethereum:
        return 50;
      case Blockchain.Arbitrum:
        return 30;
      case Blockchain.Zilliqa:
      case Blockchain.Neo:
        return 20;
      default:
        return -99;
    }
  };

  //  const sortedBalances = useMemo(() => {
  //    return balances
  //      .filter((balance: WalletBalance) => {
  //        const balancePriority = getPriority(balance.blockchain);
  //        if (lhsPriority > -99) {
  //          if (balance.amount <= 0) {
  //            return true;
  //          }
  //        }
  //        return false;
  //      })
  //      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
  //        const leftPriority = getPriority(lhs.blockchain);
  //        const rightPriority = getPriority(rhs.blockchain);
  //        if (leftPriority > rightPriority) {
  //          return -1;
  //        } else if (rightPriority > leftPriority) {
  //          return 1;
  //        }
  //      });
  //  }, [balances, prices]);

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balancePriority = getPriority(balance.blockchain);
        return balancePriority > -99 && balance.amount <= 0; // remove if else makes the source code easier to read.
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority; // use direct subtraction to sort in descending order and remove if else to make the source code easier to read.
      });
  }, [balances]); // remove prices because not use it.

  const formattedBalances: FormattedWalletBalance[] = sortedBalances.map(
    (balance: WalletBalance) => ({
      ...balance,
      formatted: balance.amount.toFixed(2), // format quantity with 2 decimal places, actually this depends on you, for me i will take the quantity with 2 decimal places.
    })
  );

  const rows = formattedBalances.map(
    (balance: FormattedWalletBalance, index: number) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return (
        <WalletRow
          key={index}
          className={classes.row}
          amount={balance.amount}
          usdValue={usdValue}
          formattedAmount={balance.formatted}
        />
      );
    }
  );

  return <div {...rest}>{rows}</div>;
};
