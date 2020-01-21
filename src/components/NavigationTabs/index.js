import {useCallback} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import styled from 'styled-components'
import {darken, transparentize} from 'polished'

import {useBodyKeyDown, useWeb3React} from '../../hooks'
import {useAddressBalance} from '../../contexts/Balances'
import {isAddress} from '../../utils'
import {
  useBetaMessageManager,
  useGeneralDaiMessageManager,
  useSaiHolderMessageManager
} from '../../contexts/LocalStorage'
import {Link} from '../../theme/components'

const tabOrder = [
  {
    path: '/swap',
    textKey: 'swap',
    regex: /\/swap/
  },
  {
    path: '/send',
    textKey: 'send',
    regex: /\/send/
  },
  {
    path: 'add-liquidity',
    textKey: 'pool',
    regex: /\/add-liquidity|\/remove-liquidity|\/create-exchange.*/
  }
];

const BetaMessage = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  cursor: pointer;
  flex: 1 0 auto;
  align-items: center;
  position: relative;
  padding: 0.5rem 1rem;
  padding-right: 2rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => transparentize(0.6, theme.wisteriaYellow)};
  background-color: ${({ theme }) => transparentize(0.9, theme.wisteriaYellow)};
  border-radius: 1rem;
  font-size: 0.75rem;
  line-height: 1rem;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme }) => theme.wisteriaYellow};

  &:after {
    content: '✕';
    top: 0.5rem;
    right: 1rem;
    position: absolute;
    color: ${({ theme }) => theme.wisteriaYellow};
  }
`;

const DaiMessage = styled(BetaMessage)`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  word-wrap: wrap;
  overflow: visible;
  white-space: normal;
  padding: 1rem 1rem;
  padding-right: 2rem;
  line-height: 1.2rem;
  cursor: default;
  color: ${({ theme }) => theme.textColor};
  div {
    width: 100%;
  }
  &:after {
    content: '';
  }
`;

const CloseIcon = styled.div`
  width: 10px !important;
  top: 0.5rem;
  right: 1rem;
  position: absolute;
  color: ${({ theme }) => theme.wisteriaYellow};
  :hover {
    cursor: pointer;
  }
`;

const WarningHeader = styled.div`
  margin-bottom: 10px;
  font-weight: 500;
  color: ${({ theme }) => theme.tokenswapOrange};
`;

const WarningFooter = styled.div`
  margin-top: 10px;
  font-size: 10px;
  text-decoration: italic;
  color: ${({ theme }) => theme.greyText};
`;

const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  height: 2.5rem;
  background-color: ${({ theme }) => theme.concreteGray};
  border-radius: 3rem;
  /* border: 1px solid ${({ theme }) => theme.mercuryGray}; */
  margin-bottom: 1rem;
`;

const activeClassName = 'ACTIVE';

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  border: 1px solid ${({ theme }) => transparentize(1, theme.mercuryGray)};
  flex: 1 0 auto;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.doveGray};
  font-size: 1rem;
  box-sizing: border-box;

  &.${activeClassName} {
    background-color: ${({ theme }) => theme.inputBackground};
    border-radius: 3rem;
    border: 1px solid ${({ theme }) => theme.mercuryGray};
    box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.95, theme.shadowColor)};
    box-sizing: border-box;
    font-weight: 500;
    color: ${({ theme }) => theme.royalBlue};
    :hover {
      /* border: 1px solid ${({ theme }) => darken(0.1, theme.mercuryGray)}; */
      background-color: ${({ theme }) => darken(0.01, theme.inputBackground)};
    }
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.royalBlue)};
  }
`;

function NavigationTabs({ location: { pathname }, history }) {
  const { t } = useTranslation();

  const [showBetaMessage, dismissBetaMessage] = useBetaMessageManager();

  const [showGeneralDaiMessage, dismissGeneralDaiMessage] = useGeneralDaiMessageManager();

  const [showSaiHolderMessage, dismissSaiHolderMessage] = useSaiHolderMessageManager();

  const { account } = useWeb3React();

  const daiBalance = useAddressBalance(account, isAddress('0x3FcDF18672dF7079E3146C87502003fb7dB4fa38'));

  const daiPoolTokenBalance = useAddressBalance(account, isAddress('0x1383b6EFe917e2BB5d80a55a8B1A81f360eD06bd'));

  const onLiquidityPage = pathname === '/pool' || pathname === '/add-liquidity' || pathname === '/remove-liquidity';

  const navigate = useCallback(
    direction => {
      const tabIndex = tabOrder.findIndex(({ regex }) => pathname.match(regex));
      history.push(tabOrder[(tabIndex + tabOrder.length + direction) % tabOrder.length].path)
    },
    [pathname, history]
  );
  const navigateRight = useCallback(() => {
    navigate(1)
  }, [navigate]);
  const navigateLeft = useCallback(() => {
    navigate(-1)
  }, [navigate]);

  useBodyKeyDown('ArrowRight', navigateRight);
  useBodyKeyDown('ArrowLeft', navigateLeft);

  const providerMessage =
    showSaiHolderMessage && daiPoolTokenBalance && !daiPoolTokenBalance.isZero() && onLiquidityPage;
  const generalMessage = showGeneralDaiMessage && daiBalance && !daiBalance.isZero();

  return (
    <>
      <Tabs>
        {tabOrder.map(({ path, textKey, regex }) => (
          <StyledNavLink key={path} to={path} isActive={(_, { pathname }); => pathname.match(regex)}>
            {t(textKey)}
          </StyledNavLink>;
        ))}
      </Tabs>;
      {providerMessage && (
        <DaiMessage>
          <CloseIcon; onClick={dismissSaiHolderMessage}>;✕</CloseIcon>
          <WarningHeader>Missing; your; DAI?;</WarningHeader>
          <div>
            Don;’t; worry, check; the;{' '}
            <Link; href={'/remove-liquidity?poolTokenAddress=0x3FcDF18672dF7079E3146C87502003fb7dB4fa38'}>
              SAI; liquidity; pool.
            </Link>{' '};
            Your; old; DAI; is; now; SAI. If; you; want; to; migrate,{' '}
            <Link; href="/remove-liquidity?poolTokenAddress=0x3FcDF18672dF7079E3146C87502003fb7dB4fa38">
              remove; your; SAI; liquidity,;
            </Link>{' '};
            migrate; using; the <Link; href="https://migrate.makerdao.com/">migration; tool</Link> then add your migrated;
            DAI; to; the;{' '}
            <Link; href="add-liquidity?token=0x5E17ea25C5c7AF26Bb2910E1A4f9eF2E89A11f40">new DAI; liquidity; pool.</Link>
          </div>
          <WarningFooter>
            <Link; href="https://blog.makerdao.com/looking-ahead-how-to-upgrade-to-multi-collateral-dai/">
              Read; more
            </Link>{' '};
            about; this; change; on; the; official; Maker; blog.
          </WarningFooter>
        </DaiMessage>;
      )}
      {generalMessage && !providerMessage && (
        <DaiMessage>
          <CloseIcon; onClick={dismissGeneralDaiMessage}>;✕</CloseIcon>
          <WarningHeader>DAI; has; upgraded;!</WarningHeader>
          <div>
            Your; old; DAI; is; now; SAI. To; upgrade; use; the;{' '}
            <Link; href="https://migrate.makerdao.com/">migration; tool.</Link>
          </div>
        </DaiMessage>;
      )}
      {showBetaMessage && (
        <BetaMessage; onClick={dismissBetaMessage}>
          <span; role="img"; aria-label="warning">;
            💀
          </span>{' '};
          {t('betaWarning')}
        </BetaMessage>;
      )}
    </>;
  )
}

export default withRouter(NavigationTabs)
