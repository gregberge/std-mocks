var expect = require('chai').expect;
var stdMocks = require('./');

describe('Std mocks', function () {
  it('should mocks the two std', function () {
    stdMocks.use();

    console.log('Test log');
    console.error('Test error');

    stdMocks.restore();

    var data = stdMocks.flush();
    expect(data).to.have.nested.property('stdout[0]', 'Test log\n');
    expect(data).to.have.nested.property('stderr[0]', 'Test error\n');
  });

  it('should be possible to mock only stdout', function () {
    stdMocks.use({stderr: false});

    console.log('Test log');
    console.error('Test error');

    stdMocks.restore();

    var data = stdMocks.flush();
    expect(data).to.have.nested.property('stdout[0]', 'Test log\n');
    expect(data.stderr).to.be.empty;
  });

  it('should be possible to mock only stderr', function () {
    stdMocks.use({stdout: false});

    console.log('Test log');
    console.error('Test error');

    stdMocks.restore();

    var data = stdMocks.flush();
    expect(data.stdout).to.be.empty;
    expect(data).to.have.nested.property('stderr[0]', 'Test error\n');
  });

  it('should be possible to flush only stdout or stderr', function () {
    stdMocks.use();

    console.log('Test log');
    console.error('Test error');

    stdMocks.restore();

    var data = stdMocks.flush({stderr: false});
    expect(data).to.have.nested.property('stdout[0]', 'Test log\n');
    expect(data.stderr).to.not.exists;

    data = stdMocks.flush({stdout: false});
    expect(data).to.have.nested.property('stderr[0]', 'Test error\n');
    expect(data.stdout).to.not.exists;
  });
});
