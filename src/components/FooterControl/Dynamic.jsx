import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Dynamic extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            width: '100%',
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.resizeFooterToolbar, {
            passive: true,
        });

        const sider = document.querySelectorAll('.ant-layout-sider')[0];

        if (sider) {
            const width = `calc(100% - ${sider.style.width})`;
            const { width: stateWidth } = this.state;
            if (stateWidth !== width) {
                this.setState({ width });
            }
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeFooterToolbar);
    }

    resizeFooterToolbar = () => {
        requestAnimationFrame(() => {
            const sider = document.querySelectorAll('.ant-layout-sider')[0];

            if (sider) {
                const width = `calc(100% - ${sider.style.width})`;
                const { width: stateWidth } = this.state;
                if (stateWidth !== width) {
                    this.setState({ width });
                }
            }
        });
    };

    renderDynamic() {
        const { children, dynamic, extra } = this.props;
        if (!dynamic) {
            return (
                <div>
                    {extra && (
                        <div style={{ float: 'left', display: 'flex' }}>
                            <h3>{extra}</h3>
                        </div>
                    )}
                    <div style={{ float: 'right', display: 'flex' }}>
                        {children}
                    </div>
                </div>
            );
        }

        return children;
    }

    render() {
        const { width } = this.state;
        return (
            <div
                style={{
                    height: '9%',
                    width,
                    backgroundColor: '#FAFAFA',
                    position: 'fixed',
                    bottom: 0,
                    right: 0,
                    zIndex: 9,
                    borderTop: '1px solid #e8e8e8',
                }}
            >
                {this.renderDynamic()}
            </div>
        );
    }
}

Dynamic.propTypes = {
    dynamic: PropTypes.bool,
    extra: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.bool),
    ]),
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.shape({})),
        PropTypes.node,
    ]).isRequired,
};

Dynamic.defaultProps = {
    dynamic: undefined,
    extra: undefined,
};

export default Dynamic;
