class MicropostsController < ApplicationController
    require 'aws-sdk'
    include CarrierwaveBase64Uploader
    def create
        logger.debug(ENV['RAILS_ENV'])
        logger.debug(ENV['s3url'])
        logger.debug(ENV['region'])
        logger.debug(ENV['access_key'])
        logger.debug(ENV['secret_access_key'])

        if Rails.env.production?
            setting = {
                s3url: ENV['s3url'],
                s3_bucket: ENV['s3_bucket'],
                region: ENV['region'],
                access_key: ENV['access_key'],
                secret_access_key: ENV['secret_access_key']
            }
        else
            setting = {
                s3url: Settings.aws[:s3_url],
                s3_bucket: Settings.aws[:s3_bucket],
                region: Settings.aws[:region],
                access_key: Settings.aws[:access_key],
                secret_access_key: Settings.aws[:secret_access_key]
            }
        end
        img = base64_conversion(params[:micropost][:img])
        imgurl = setting[:s3url] + setting[:s3_bucket] + "/" + params[:micropost][:fileName] + '.png'
        bucket = Aws::S3::Resource.new(
                            :region => setting[:region],
                            :access_key_id => setting[:access_key],
                            :secret_access_key => setting[:secret_access_key],
                            ).bucket(setting[:s3_bucket])
        bucket.object(params[:micropost][:fileName] + '.png').put(body: img, content_type: 'image/png', content_encoding: 'base64')
        # microposts = Micropost.new(post_params(content))
        Micropost.create(content: imgurl, user_id: current_user.id)
        render :json => { 'result' => imgurl }
    end

    def destroy
    end

    private
        def post_params(content)
            params.require(:micropost).permit(content, :user_id)
        end
end
